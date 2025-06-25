import { Container, Grid, Title, Table } from '@mantine/core';
import React from 'react';
import { DataCard } from './DataCard';
import { ActionButtons } from './ActionButtons';
import * as api from '../services/api';

// Type definitions
interface Galaxy {
  id_galaxia: number;
  nome: string;
  tipo: string;
  distancia_terra: number;
}

interface Planet {
  id_planeta: number;
  nome: string;
  gravidade: number;
  habitavel: boolean;
  nome_galaxia: string;
}

interface Star {
  id_estrela: number;
  nome: string;
  tipo: string;
  magnitude: number;
  nome_galaxia: string;
}

interface Exoplanet {
  id_exoplaneta: number;
  nome: string;
  massa: number;
  raio: number;
  nome_estrela: string;
}

interface Element {
  id_elemento: number;
  nome_elemento: string;
  sigla_elemento: string;
  total_planets: number;
}

interface Cluster {
  id_aglomerado: number;
  nome: string;
  tipo: string;
  distancia_terra: number;
  nome_galaxia: string;
}

interface Nebula {
  id_nebulosa: number;
  nome: string;
  tipo: string;
  distancia_terra: number;
  nome_galaxia: string;
}

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
  deleteMutation: (id: number) => Promise<unknown>;
  itemToId: (item: T) => number;
}

const cardConfigs: CardConfig<any>[] = [
  {
    title: 'Galáxias',
    queries: {
      mainData: { queryKey: ['galaxies'], queryFn: api.getAllGalaxies },
      kpis: [
        {
          queryKey: ['galaxiesCount'],
          queryFn: api.getGalaxiesCount,
          title: 'Total',
          render: (data?: { data: { total: number } }) =>
            data?.data.total.toString() ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Tipo', 'Distância'],
    renderRow: (item: Galaxy) => (
      <>
        <Table.Td>{item.id_galaxia}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.tipo}</Table.Td>
        <Table.Td>{item.distancia_terra}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteGalaxy,
    itemToId: (item: Galaxy) => item.id_galaxia,
  },
  {
    title: 'Planetas',
    queries: {
      mainData: { queryKey: ['planets'], queryFn: api.getAllPlanets },
      kpis: [
        {
          queryKey: ['planetsCount'],
          queryFn: api.getPlanetsCount,
          title: 'Total',
          render: (data?: { data: { total: number } }) =>
            data?.data.total.toString() ?? 'N/A',
        },
        {
          queryKey: ['habitablePlanetsCount'],
          queryFn: api.getHabitablePlanetsCount,
          title: 'Habitáveis',
          render: (data?: { data: { total: number } }) =>
            data?.data.total.toString() ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Gravidade', 'Habitável', 'Galáxia'],
    renderRow: (item: Planet) => (
      <>
        <Table.Td>{item.id_planeta}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.gravidade}</Table.Td>
        <Table.Td>{String(item.habitavel)}</Table.Td>
        <Table.Td>{item.nome_galaxia}</Table.Td>
      </>
    ),
    deleteMutation: api.deletePlanet,
    itemToId: (item: Planet) => item.id_planeta,
  },
  {
    title: 'Estrelas',
    queries: {
      mainData: { queryKey: ['stars'], queryFn: api.getAllStars },
      kpis: [
        {
          queryKey: ['starsCount'],
          queryFn: api.getStarsCount,
          title: 'Total',
          render: (data?: { data: { total: number } }) =>
            data?.data.total.toString() ?? 'N/A',
        },
        {
          queryKey: ['brightestStar'],
          queryFn: api.getBrightestStar,
          title: 'Mais Brilhante',
          render: (data?: { data: { nome: string } }) =>
            data?.data.nome ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Tipo', 'Magnitude', 'Galáxia'],
    renderRow: (item: Star) => (
      <>
        <Table.Td>{item.id_estrela}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.tipo}</Table.Td>
        <Table.Td>{item.magnitude}</Table.Td>
        <Table.Td>{item.nome_galaxia}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteStar,
    itemToId: (item: Star) => item.id_estrela,
  },
  {
    title: 'Exoplanetas',
    queries: {
      mainData: { queryKey: ['exoplanets'], queryFn: api.getAllExoplanets },
      kpis: [
        {
          queryKey: ['exoplanetsCount'],
          queryFn: api.getExoplanetsCount,
          title: 'Total',
          render: (data?: { data: { total: number } }) =>
            data?.data.total.toString() ?? 'N/A',
        },
        {
          queryKey: ['largestExoplanet'],
          queryFn: api.getLargestExoplanet,
          title: 'Maior (Raio)',
          render: (data?: { data: { nome: string } }) =>
            data?.data.nome ?? 'N/A',
        },
        {
          queryKey: ['mostMassiveExoplanet'],
          queryFn: api.getMostMassiveExoplanet,
          title: 'Mais Massivo',
          render: (data?: { data: { nome: string } }) =>
            data?.data.nome ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Massa', 'Raio', 'Estrela'],
    renderRow: (item: Exoplanet) => (
      <>
        <Table.Td>{item.id_exoplaneta}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.massa}</Table.Td>
        <Table.Td>{item.raio}</Table.Td>
        <Table.Td>{item.nome_estrela}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteExoplanet,
    itemToId: (item: Exoplanet) => item.id_exoplaneta,
  },
  {
    title: 'Elementos',
    queries: {
      mainData: { queryKey: ['elements'], queryFn: api.getAllElements },
      kpis: [
        {
          queryKey: ['elementsCount'],
          queryFn: api.getElementsCount,
          title: 'Total',
          render: (data?: { data: { total: number } }) =>
            data?.data.total.toString() ?? 'N/A',
        },
        {
          queryKey: ['mostCommonElement'],
          queryFn: api.getMostCommonElement,
          title: 'Mais Comum',
          render: (data?: { data: { nome_elemento: string } }) =>
            data?.data.nome_elemento ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Símbolo', 'Encontrado em # Planetas'],
    renderRow: (item: Element) => (
      <>
        <Table.Td>{item.id_elemento}</Table.Td>
        <Table.Td>{item.nome_elemento}</Table.Td>
        <Table.Td>{item.sigla_elemento}</Table.Td>
        <Table.Td>{item.total_planets}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteElement,
    itemToId: (item: Element) => item.id_elemento,
  },
  {
    title: 'Aglomerados',
    queries: {
      mainData: { queryKey: ['clusters'], queryFn: api.getAllClusters },
      kpis: [
        {
          queryKey: ['clustersCount'],
          queryFn: api.getClustersCount,
          title: 'Total',
          render: (data?: { data: { total: number } }) =>
            data?.data.total.toString() ?? 'N/A',
        },
        {
          queryKey: ['closestCluster'],
          queryFn: api.getClosestCluster,
          title: 'Mais Próximo',
          render: (data?: { data: { nome: string } }) =>
            data?.data.nome ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Tipo', 'Distância', 'Galáxia'],
    renderRow: (item: Cluster) => (
      <>
        <Table.Td>{item.id_aglomerado}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.tipo}</Table.Td>
        <Table.Td>{item.distancia_terra}</Table.Td>
        <Table.Td>{item.nome_galaxia}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteCluster,
    itemToId: (item: Cluster) => item.id_aglomerado,
  },
  {
    title: 'Nebulosas',
    queries: {
      mainData: { queryKey: ['nebulae'], queryFn: api.getAllNebulae },
      kpis: [
        {
          queryKey: ['nebulaeCount'],
          queryFn: api.getNebulaeCount,
          title: 'Total',
          render: (data?: { data: { total: number } }) =>
            data?.data.total.toString() ?? 'N/A',
        },
        {
          queryKey: ['closestNebula'],
          queryFn: api.getClosestNebula,
          title: 'Mais Próxima',
          render: (data?: { data: { nome: string } }) =>
            data?.data.nome ?? 'N/A',
        },
      ],
    },
    tableHeaders: ['ID', 'Nome', 'Tipo', 'Distância', 'Galáxia'],
    renderRow: (item: Nebula) => (
      <>
        <Table.Td>{item.id_nebulosa}</Table.Td>
        <Table.Td>{item.nome}</Table.Td>
        <Table.Td>{item.tipo}</Table.Td>
        <Table.Td>{item.distancia_terra}</Table.Td>
        <Table.Td>{item.nome_galaxia}</Table.Td>
      </>
    ),
    deleteMutation: api.deleteNebula,
    itemToId: (item: Nebula) => item.id_nebulosa,
  },
];

export function Dashboard() {
  return (
    <Container fluid style={{ minHeight: '100vh', padding: '1rem' }}>
      <Title order={1} ta="center" my="xl">
        AstroCRUD
      </Title>
      <ActionButtons />

      <Grid my="xl">
        {cardConfigs.map((config) => (
          <Grid.Col key={config.title} span={{ base: 12, md: 6, lg: 4 }}>
            <DataCard {...config} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
