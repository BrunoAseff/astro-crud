/* eslint-disable @typescript-eslint/no-explicit-any */


import {
 Card,
 Title,
 Text,
 Table,
 Group,
 Badge,
 Loader,
 ActionIcon,
 ScrollArea,
} from '@mantine/core';
import {
 useQueries,
 useMutation,
 useQueryClient,
 useQuery,
} from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import React from 'react';


interface Kpi {
 queryKey: string[];
 queryFn: () => Promise<any>;
 title: string;
 render: (data: any) => string;
}


interface DataCardProps {
 title: string;
 queries: {
   mainData: {
     queryKey: string[];
     queryFn: () => Promise<any>;
   };
   kpis: Kpi[];
 };
 tableHeaders: string[];
 renderRow: (item: any) => React.ReactNode;
 deleteMutation: (id: number) => Promise<any>;
 itemToId: (item: any) => number;
}


export function DataCard({
 title,
 queries,
 tableHeaders,
 renderRow,
 deleteMutation,
 itemToId,
}: DataCardProps) {
 const queryClient = useQueryClient();


 const {
   data: mainData,
   isLoading: isMainLoading,
   error: mainError,
 } = useQuery(queries.mainData);


 const kpiQueryResults = useQueries({
   queries: queries.kpis.map((kpi) => ({
     queryKey: kpi.queryKey,
     queryFn: kpi.queryFn,
   })),
 });


 const deletion = useMutation({
   mutationFn: deleteMutation,
   onSuccess: () => {
     notifications.show({
       title: 'Sucesso',
       message: `Item de ${title} excluído com sucesso.`,
       color: 'green',
     });
     queryClient.invalidateQueries({ queryKey: queries.mainData.queryKey });
     queries.kpis.forEach((kpi) => {
       queryClient.invalidateQueries({ queryKey: kpi.queryKey });
     });
   },
   onError: (error: any) => {
     notifications.show({
       title: 'Erro',
       message:
         error.response?.data?.message || `Falha ao excluir item de ${title}.`,
       color: 'red',
     });
   },
 });


 const handleDelete = (id: number) => {
   deletion.mutate(id);
 };


 const areKpisLoading = kpiQueryResults.some((result) => result.isLoading);


 return (
   <Card shadow="sm" padding="lg" radius="md" withBorder>
     <Title order={3}>{title}</Title>
     <Group mt="md" mb="xs">
       {areKpisLoading && <Loader size="sm" />}
       {kpiQueryResults.map((result, index) => {
         const kpi = queries.kpis[index];
         if (!kpi) return null;
         return (
           <Badge key={index} variant="light" size="lg">
             <Text>
               {kpi.title}:{' '}
               {result.isLoading ? (
                 <Loader size="xs" />
               ) : result.error ? (
                 'Erro'
               ) : (
                 kpi.render(result.data)
               )}
             </Text>
           </Badge>
         );
       })}
     </Group>


     <ScrollArea style={{ height: 300 }}>
       <Table striped highlightOnHover>
         <Table.Thead>
           <Table.Tr>
             {tableHeaders.map((header) => (
               <Table.Th key={header}>{header}</Table.Th>
             ))}
             <Table.Th>Ações</Table.Th>
           </Table.Tr>
         </Table.Thead>
         <Table.Tbody>
           {isMainLoading ? (
             <Table.Tr>
               <Table.Td colSpan={tableHeaders.length + 1}>
                 <Loader />
               </Table.Td>
             </Table.Tr>
           ) : mainError ? (
             <Table.Tr>
               <Table.Td colSpan={tableHeaders.length + 1}>
                 <Text color="red">Erro ao carregar dados.</Text>
               </Table.Td>
             </Table.Tr>
           ) : (
             mainData?.data?.map((item: any, index: number) => (
               <Table.Tr key={index}>
                 {renderRow(item)}
                 <Table.Td>
                   <ActionIcon
                     color="red"
                     onClick={() => handleDelete(itemToId(item))}
                     loading={
                       deletion.isPending &&
                       deletion.variables === itemToId(item)
                     }
                   >
                     <IconTrash size={16} />
                   </ActionIcon>
                 </Table.Td>
               </Table.Tr>
             ))
           )}
         </Table.Tbody>
       </Table>
     </ScrollArea>
   </Card>
 );
}
