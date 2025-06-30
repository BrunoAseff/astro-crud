/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Switch,
  Button,
  Group,
  Stack,
} from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../services/api';

interface EditModalProps {
  opened: boolean;
  onClose: () => void;
  entityType: string;
  item: Record<string, any> | null;
}

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  required: boolean;
  options?: string;
}

interface EntityConfig {
  title: string;
  fields: FieldConfig[];
  updateFunction: (id: number, data: Record<string, any>) => Promise<any>;
  getIdField: string;
}

const entityConfigs: Record<string, EntityConfig> = {
  galaxies: {
    title: 'Editar Galáxia',
    fields: [
      { name: 'nome', label: 'Nome', type: 'text', required: true },
      { name: 'tipo', label: 'Tipo', type: 'text', required: false },
      {
        name: 'distancia_terra',
        label: 'Distância da Terra',
        type: 'number',
        required: false,
      },
    ],
    updateFunction: api.updateGalaxy,
    getIdField: 'id_galaxia',
  },
  planets: {
    title: 'Editar Planeta',
    fields: [
      { name: 'nome', label: 'Nome', type: 'text', required: true },
      {
        name: 'gravidade',
        label: 'Gravidade',
        type: 'number',
        required: false,
      },
      {
        name: 'habitavel',
        label: 'Habitável',
        type: 'boolean',
        required: true,
      },
      {
        name: 'id_galaxia',
        label: 'Galáxia',
        type: 'select',
        required: true,
        options: 'galaxies',
      },
    ],
    updateFunction: api.updatePlanet,
    getIdField: 'id_planeta',
  },
  stars: {
    title: 'Editar Estrela',
    fields: [
      { name: 'nome', label: 'Nome', type: 'text', required: true },
      { name: 'tipo', label: 'Tipo', type: 'text', required: false },
      {
        name: 'magnitude',
        label: 'Magnitude',
        type: 'number',
        required: false,
      },
      {
        name: 'id_galaxia',
        label: 'Galáxia',
        type: 'select',
        required: true,
        options: 'galaxies',
      },
    ],
    updateFunction: api.updateStar,
    getIdField: 'id_estrela',
  },
  elements: {
    title: 'Editar Elemento',
    fields: [
      {
        name: 'nome_elemento',
        label: 'Nome do Elemento',
        type: 'text',
        required: true,
      },
      {
        name: 'sigla_elemento',
        label: 'Símbolo',
        type: 'text',
        required: true,
      },
    ],
    updateFunction: api.updateElement,
    getIdField: 'id_elemento',
  },
  clusters: {
    title: 'Editar Aglomerado',
    fields: [
      { name: 'nome', label: 'Nome', type: 'text', required: true },
      { name: 'tipo', label: 'Tipo', type: 'text', required: false },
      {
        name: 'distancia_terra',
        label: 'Distância da Terra',
        type: 'number',
        required: false,
      },
      {
        name: 'id_galaxia',
        label: 'Galáxia',
        type: 'select',
        required: true,
        options: 'galaxies',
      },
    ],
    updateFunction: api.updateCluster,
    getIdField: 'id_aglomerado',
  },
  nebulae: {
    title: 'Editar Nebulosa',
    fields: [
      { name: 'nome', label: 'Nome', type: 'text', required: true },
      { name: 'tipo', label: 'Tipo', type: 'text', required: false },
      {
        name: 'distancia_terra',
        label: 'Distância da Terra',
        type: 'number',
        required: false,
      },
      {
        name: 'id_galaxia',
        label: 'Galáxia',
        type: 'select',
        required: true,
        options: 'galaxies',
      },
    ],
    updateFunction: api.updateNebula,
    getIdField: 'id_nebulosa',
  },
  exoplanets: {
    title: 'Editar Exoplaneta',
    fields: [
      { name: 'nome', label: 'Nome', type: 'text', required: true },
      { name: 'massa', label: 'Massa', type: 'number', required: false },
      { name: 'raio', label: 'Raio', type: 'number', required: false },
      {
        name: 'id_estrela',
        label: 'Estrela',
        type: 'select',
        required: true,
        options: 'stars',
      },
    ],
    updateFunction: api.updateExoplanet,
    getIdField: 'id_exoplaneta',
  },
};

export function EditModal({
  opened,
  onClose,
  entityType,
  item,
}: EditModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const config = entityConfigs[entityType];

  const { data: galaxiesData } = useQuery({
    queryKey: ['galaxies'],
    queryFn: api.getAllGalaxies,
    enabled:
      config?.fields.some((field) => field.options === 'galaxies') || false,
  });

  const { data: starsData } = useQuery({
    queryKey: ['stars'],
    queryFn: api.getAllStars,
    enabled: config?.fields.some((field) => field.options === 'stars') || false,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Record<string, any> }) =>
      config?.updateFunction(id, data) || Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityType] });
      queryClient.invalidateQueries({ queryKey: [`${entityType}Count`] });
      setFormData({});
      setErrors({});
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    config?.fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.name];
        if (field.type === 'boolean') {
          if (value === undefined || value === null) {
            newErrors[field.name] = 'Campo obrigatório';
          }
        } else {
          if (!value) {
            newErrors[field.name] = 'Campo obrigatório';
          }
        }
      }
    });

    if (Object.keys(newErrors).length === 0 && item && config) {
      const id = item[config.getIdField];
      updateMutation.mutate({ id, data: formData });
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };

  React.useEffect(() => {
    if (item && opened && config) {
      const initialValues: Record<string, any> = {};
      config.fields.forEach((field) => {
        initialValues[field.name] = item[field.name];
      });
      setFormData(initialValues);
      setErrors({});
    }
  }, [item, opened, config]);

  const renderField = (field: FieldConfig) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'text':
        return (
          <TextInput
            key={field.name}
            label={field.label}
            placeholder={field.label}
            required={field.required}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            error={error}
          />
        );
      case 'number':
        return (
          <NumberInput
            key={field.name}
            label={field.label}
            placeholder={field.label}
            required={field.required}
            decimalScale={4}
            value={value}
            onChange={(val) => handleInputChange(field.name, val)}
            error={error}
          />
        );
      case 'boolean':
        return (
          <Switch
            key={field.name}
            label={field.label}
            checked={value}
            onChange={(e) => handleInputChange(field.name, e.target.checked)}
          />
        );
      case 'select': {
        let options: { value: string; label: string }[] = [];
        if (field.options === 'galaxies' && galaxiesData?.data) {
          options = galaxiesData.data.map(
            (galaxy: { id_galaxia: number; nome: string }) => ({
              value: galaxy.id_galaxia.toString(),
              label: galaxy.nome,
            })
          );
        } else if (field.options === 'stars' && starsData?.data) {
          options = starsData.data.map(
            (star: { id_estrela: number; nome: string }) => ({
              value: star.id_estrela.toString(),
              label: star.nome,
            })
          );
        }
        return (
          <Select
            key={field.name}
            label={field.label}
            placeholder="Selecione..."
            required={field.required}
            data={options}
            value={value}
            onChange={(val) => handleInputChange(field.name, val || '')}
            error={error}
          />
        );
      }
      default:
        return null;
    }
  };

  if (!config || !item) return null;

  return (
    <Modal opened={opened} onClose={onClose} title={config.title} size="md">
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          {config.fields.map(renderField)}

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" loading={updateMutation.isPending}>
              Atualizar
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
