import { queryClient } from "App";
import IQuestion from "interfaces/form/question";

export const getSurveyOptimisticUpdate: any = (queryToUpdate: string) => {
  return {
    onMutate: async () => {
      await queryClient.cancelQueries(queryToUpdate);

      const previousQuestions = queryClient.getQueryData(queryToUpdate);

      if (previousQuestions) {
        queryClient.setQueryData(queryToUpdate, (old: any) => [
          ...old,
          previousQuestions,
        ]);
      }

      return { previousQuestions };
    },
    onError: (context: any) => {
      queryClient.setQueryData<IQuestion[]>(
        queryToUpdate,
        context.previousQuestions
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryToUpdate);
    },
  };
};
