/* eslint-disable @typescript-eslint/no-explicit-any */

import { Container, Grid, Table } from '@mantine/core';
import { useState } from 'react';
import { ActionButtons } from './ActionButtons';
import { DataCard } from './DataCard';
import { AddModal } from './AddModal';
import { EditModal } from './EditModal';
import * as api from '../services/api';

interface CardConfig<T> {
  title: string;
  queries: {
    mainData: {
      queryKey: string[];
      queryFn: () => Promise<{ data: T[] }>;
    };
    kpis: {
      queryKey: string[];
      queryFn: () => Promise<any>;
      title: string;
      render: (data?: any) => string;
    }[];
  };
  tableHeaders: string[];
  renderRow: (item: T) => React.ReactNode;
  deleteMutation: (id: number) => Promise<any>;
  itemToId: (item: T) => number;
  entityType: string;
}

const cardConfigs: CardConfig<any>[] = [
  {
    title: 'Galáxias',
    entityType: 'galaxies',
    queries: {
      mainData: { queryKey: ['galaxies'], queryFn: api.getAllGalaxies },
      kpis: [
        {
          queryKey: ['galaxiesCount'],
          queryFn: api.getGalaxiesCount,
          title: 'Total',
          render: (data?: any) => data?.data?.total?.toString() ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Tipo', 'Distância da Terra'],
    renderRow: (item: any) => (
      <>
        <Table.Td>{item.id_galaxia}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.tipo}</Table.Td>
        <Table.Td>{item.distancia_terra}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteGalaxy,
    itemToId: (item: any) => item.id_galaxia,
  },
  {
    title: 'Planetas',
    entityType: 'planets',
    queries: {
      mainData: { queryKey: ['planets'], queryFn: api.getAllPlanets },
      kpis: [
        {
          queryKey: ['planetsCount'],
          queryFn: api.getPlanetsCount,
          title: 'Total',
          render: (data?: any) => data?.data?.total?.toString() ?? 'N/A',
        },
        {
          queryKey: ['habitablePlanetsCount'],
          queryFn: api.getHabitablePlanetsCount,
          title: 'Habitáveis',
          render: (data?: any) => data?.total?.toString() ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Gravidade', 'Habitável', 'Galáxia'],
    renderRow: (item: any) => (
      <>
        <Table.Td>{item.id_planeta}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.gravidade}</Table.Td>
        <Table.Td>{item.habitavel ? 'Sim' : 'Não'}</Table.Td>
        <Table.Td>{item.nome_galaxia}</Table.Td>
      </>
    ),
    deleteMutation: api.deletePlanet,
    itemToId: (item: any) => item.id_planeta,
  },
  {
    title: 'Estrelas',
    entityType: 'stars',
    queries: {
      mainData: { queryKey: ['stars'], queryFn: api.getAllStars },
      kpis: [
        {
          queryKey: ['starsCount'],
          queryFn: api.getStarsCount,
          title: 'Total',
          render: (data?: any) => data?.data?.total?.toString() ?? 'N/A',
        },
        {
          queryKey: ['brightestStar'],
          queryFn: api.getBrightestStar,
          title: 'Mais Brilhante',
          render: (data?: any) => data?.nome ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Tipo', 'Magnitude', 'Galáxia'],
    renderRow: (item: any) => (
      <>
        <Table.Td>{item.id_estrela}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.tipo}</Table.Td>
        <Table.Td>{item.magnitude}</Table.Td>
        <Table.Td>{item.nome_galaxia}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteStar,
    itemToId: (item: any) => item.id_estrela,
  },
  {
    title: 'Exoplanetas',
    entityType: 'exoplanets',
    queries: {
      mainData: { queryKey: ['exoplanets'], queryFn: api.getAllExoplanets },
      kpis: [
        {
          queryKey: ['exoplanetsCount'],
          queryFn: api.getExoplanetsCount,
          title: 'Total',
          render: (data?: any) => data?.data?.total?.toString() ?? 'N/A',
        },
        {
          queryKey: ['largestExoplanet'],
          queryFn: api.getLargestExoplanet,
          title: 'Maior (Raio)',
          render: (data?: any) => data?.nome ?? 'N/A',
        },
        {
          queryKey: ['mostMassiveExoplanet'],
          queryFn: api.getMostMassiveExoplanet,
          title: 'Mais Massivo',
          render: (data?: any) => data?.nome ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Massa', 'Raio', 'Estrela'],
    renderRow: (item: any) => (
      <>
        <Table.Td>{item.id_exoplaneta}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.massa}</Table.Td>
        <Table.Td>{item.raio}</Table.Td>
        <Table.Td>{item.nome_estrela}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteExoplanet,
    itemToId: (item: any) => item.id_exoplaneta,
  },
  {
    title: 'Elementos',
    entityType: 'elements',
    queries: {
      mainData: { queryKey: ['elements'], queryFn: api.getAllElements },
      kpis: [
        {
          queryKey: ['elementsCount'],
          queryFn: api.getElementsCount,
          title: 'Total',
          render: (data?: any) => data?.data?.total?.toString() ?? 'N/A',
        },
        {
          queryKey: ['mostCommonElement'],
          queryFn: api.getMostCommonElement,
          title: 'Mais Comum',
          render: (data?: any) => data?.nome_elemento ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Símbolo', 'Encontrado em # Planetas'],
    renderRow: (item: any) => (
      <>
        <Table.Td>{item.id_elemento}</Table.Td>
        <Table.Td>{item.nome_elemento}</Table.Td>
        <Table.Td>{item.sigla_elemento}</Table.Td>
        <Table.Td>{item.total_planets}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteElement,
    itemToId: (item: any) => item.id_elemento,
  },
  {
    title: 'Aglomerados',
    entityType: 'clusters',
    queries: {
      mainData: { queryKey: ['clusters'], queryFn: api.getAllClusters },
      kpis: [
        {
          queryKey: ['clustersCount'],
          queryFn: api.getClustersCount,
          title: 'Total',
          render: (data?: any) => data?.data?.total?.toString() ?? 'N/A',
        },
        {
          queryKey: ['closestCluster'],
          queryFn: api.getClosestCluster,
          title: 'Mais Próximo',
          render: (data?: any) => data?.nome ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Tipo', 'Distância', 'Galáxia'],
    renderRow: (item: any) => (
      <>
        <Table.Td>{item.id_aglomerado}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.tipo}</Table.Td>
        <Table.Td>{item.distancia_terra}</Table.Td>
        <Table.Td>{item.nome_galaxia}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteCluster,
    itemToId: (item: any) => item.id_aglomerado,
  },
  {
    title: 'Nebulosas',
    entityType: 'nebulae',
    queries: {
      mainData: { queryKey: ['nebulae'], queryFn: api.getAllNebulae },
      kpis: [
        {
          queryKey: ['nebulaeCount'],
          queryFn: api.getNebulaeCount,
          title: 'Total',
          render: (data?: any) => data?.data?.total?.toString() ?? 'N/A',
        },
        {
          queryKey: ['closestNebula'],
          queryFn: api.getClosestNebula,
          title: 'Mais Próxima',
          render: (data?: any) => data?.nome ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Tipo', 'Distância', 'Galáxia'],
    renderRow: (item: any) => (
      <>
        <Table.Td>{item.id_nebulosa}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.tipo}</Table.Td>
        <Table.Td>{item.distancia_terra}</Table.Td>
        <Table.Td>{item.nome_galaxia}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteNebula,
    itemToId: (item: any) => item.id_nebulosa,
  },
];

export function Dashboard() {
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [selectedEntityType, setSelectedEntityType] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleAddClick = () => {
    setAddModalOpened(true);
  };

  const handleEditClick = (item: any, entityType: string) => {
    setSelectedItem(item);
    setSelectedEntityType(entityType);
    setEditModalOpened(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpened(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpened(false);
    setSelectedItem(null);
    setSelectedEntityType('');
  };

  return (
    <Container fluid style={{ minHeight: '100vh', padding: '1rem' }}>
      <ActionButtons onAddClick={handleAddClick} />

      <Grid my="xl">
        {cardConfigs.map((config, index) => (
          <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
            <DataCard
              {...config}
              onEditClick={(item) => handleEditClick(item, config.entityType)}
            />
          </Grid.Col>
        ))}
      </Grid>

      <AddModal opened={addModalOpened} onClose={handleCloseAddModal} />

      <EditModal
        opened={editModalOpened}
        onClose={handleCloseEditModal}
        entityType={selectedEntityType}
        item={selectedItem}
      />
    </Container>
  );
}
