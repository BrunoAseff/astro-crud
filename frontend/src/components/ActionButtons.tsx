import { Button, Group } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { createDatabase, insertData } from '../services/api';

interface ActionButtonsProps {
  onAddClick: () => void;
}

export function ActionButtons({ onAddClick }: ActionButtonsProps) {
  const queryClient = useQueryClient();

  const mutationOptions = {
    onSuccess: (data: { data: { message: string } }) => {
      notifications.show({
        title: 'Sucesso',
        message: data.data.message,
        color: 'green',
      });
      queryClient.invalidateQueries();
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      notifications.show({
        title: 'Erro',
        message: error.response?.data?.message || 'Ocorreu um erro',
        color: 'red',
      });
    },
  };

  const createDatabaseMutation = useMutation({
    mutationFn: createDatabase,
    ...mutationOptions,
  });

  const insertDataMutation = useMutation({
    mutationFn: insertData,
    ...mutationOptions,
  });

  return (
    <Group>
      <Button
        onClick={() => createDatabaseMutation.mutate()}
        loading={createDatabaseMutation.isPending}
      >
        Criar Tabelas
      </Button>
      <Button
        onClick={() => insertDataMutation.mutate()}
        loading={insertDataMutation.isPending}
        color="teal"
      >
        Adicionar Dados
      </Button>
      <Button onClick={onAddClick} color="blue" leftSection="+">
        Adicionar Item
      </Button>
    </Group>
  );
}
