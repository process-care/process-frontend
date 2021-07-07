import { queryClient } from "App";

export const optimisticUpdate: any = (queryToUpdate: string) => {
  return {
    onMutate: async (data: any) => {
      await queryClient.cancelQueries(queryToUpdate);

      const previousData = queryClient.getQueryData(queryToUpdate);

      queryClient.setQueryData(queryToUpdate, () => {
        // [...old, data];
        [data];
      });

      return { previousData };
    },
    onError: (context: any) => {
      queryClient.setQueryData(queryToUpdate, context.previousData);
    },
    onSuccess: (data: any) => data,
    onSettled: () => {
      queryClient.invalidateQueries(queryToUpdate);
    },
  };
};

export const optimisticItemUpdate: any = (
  queryToUpdate: string,
  id: string,
  data: any
) => {
  return {
    onMutate: async () => {
      await queryClient.cancelQueries([queryToUpdate, id]);

      const previousData = queryClient.getQueryData([queryToUpdate, id]);
      queryClient.setQueryData([queryToUpdate, id], data);

      return { previousData, data };
    },
    onError: (context: any) => {
      queryClient.setQueryData(
        [queryToUpdate, context.id],
        context.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryToUpdate, id]);
    },
  };
};
