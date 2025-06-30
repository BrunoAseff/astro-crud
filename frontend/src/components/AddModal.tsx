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
  Title,
} from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../services/api';

interface AddModalProps {
  opened: boolean;
  onClose: () => void;
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
  createFunction: (data: Record<string, any>) => Promise<any>;
}

const entityConfigs: Record<string, EntityConfig> = {
  galaxies: {
    title: 'Adicionar Galáxia',
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
    createFunction: api.createGalaxy,
  },
  planets: {
    title: 'Adicionar Planeta',
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
    createFunction: api.createPlanet,
  },
  stars: {
    title: 'Adicionar Estrela',
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
    createFunction: api.createStar,
  },
  elements: {
    title: 'Adicionar Elemento',
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
    createFunction: api.createElement,
  },
  clusters: {
    title: 'Adicionar Aglomerado',
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
    createFunction: api.createCluster,
  },
  nebulae: {
    title: 'Adicionar Nebulosa',
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
    createFunction: api.createNebula,
  },
  exoplanets: {
    title: 'Adicionar Exoplaneta',
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
    createFunction: api.createExoplanet,
  },
};

const entityOptions = [
  { value: 'galaxies', label: 'Galáxias' },
  { value: 'planets', label: 'Planetas' },
  { value: 'stars', label: 'Estrelas' },
  { value: 'elements', label: 'Elementos' },
  { value: 'clusters', label: 'Aglomerados' },
  { value: 'nebulae', label: 'Nebulosas' },
  { value: 'exoplanets', label: 'Exoplanetas' },
];

export function AddModal({ opened, onClose }: AddModalProps) {
  const queryClient = useQueryClient();
  const [selectedEntityType, setSelectedEntityType] = React.useState('');
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const config = entityConfigs[selectedEntityType];

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

  const createMutation = useMutation({
    mutationFn: config?.createFunction || (() => Promise.resolve()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [selectedEntityType] });
      queryClient.invalidateQueries({
        queryKey: [`${selectedEntityType}Count`],
      });
      setFormData({});
      setErrors({});
      setSelectedEntityType('');
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

    if (Object.keys(newErrors).length === 0) {
      createMutation.mutate(formData);
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

  const handleEntitySelect = (value: string) => {
    setSelectedEntityType(value);
    const newConfig = entityConfigs[value];
    if (newConfig) {
      const initialValues: Record<string, any> = {};
      newConfig.fields.forEach((field) => {
        initialValues[field.name] = field.type === 'boolean' ? false : '';
      });
      setFormData(initialValues);
      setErrors({});
    }
  };

  const handleClose = () => {
    setSelectedEntityType('');
    setFormData({});
    setErrors({});
    onClose();
  };

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

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Adicionar Novo Item"
      size="md"
    >
      {!selectedEntityType ? (
        <Stack gap="md">
          <Title order={4}>Selecione o tipo de item para adicionar:</Title>
          <Select
            label="Tipo de Item"
            placeholder="Escolha um tipo..."
            data={entityOptions}
            value={selectedEntityType}
            onChange={(val) => handleEntitySelect(val || '')}
            required
          />
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
          </Group>
        </Stack>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            {config?.fields.map(renderField)}

            <Group justify="flex-end" mt="md">
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" loading={createMutation.isPending}>
                Adicionar
              </Button>
            </Group>
          </Stack>
        </form>
      )}
    </Modal>
  );
}
