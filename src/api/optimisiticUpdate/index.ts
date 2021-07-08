import { queryClient } from "App";

export const optimisticUpdate: any = (queriesToUpdate: string[]) => {
  return {
    onMutate: async (data: any) => {
      await queryClient.cancelQueries(queriesToUpdate[0]);

      const previousData = queryClient.getQueryData(queriesToUpdate[0]);

      queryClient.setQueryData(queriesToUpdate[0], () => {
        data;
      });

      return { previousData };
    },
    onError: (context: any) => {
      queryClient.setQueryData(queriesToUpdate[0], context.previousData);
    },
    onSuccess: (data: any) => data,
    onSettled: () => {
      queriesToUpdate.map((query) => queryClient.invalidateQueries(query));
    },
  };
};
