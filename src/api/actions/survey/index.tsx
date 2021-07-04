import { request } from "graphql-request";
import { getSurveyById } from "api/queries/survey";
import { UPDATE_ORDER } from "api/queries/survey";
import { INewOrder } from "pages/Authentification";
import { useMutation } from "react-query";
import { queryClient } from "App";
import ISurvey from "interfaces/survey";

export const useGetSurveyById: any = (id: string) => {
  return request(process.env.REACT_APP_API_URL_DEV!, getSurveyById, {
    id,
  });
};

// order.

export const updateOrder: any = () =>
  useMutation(
    async ({ id, new_order }: INewOrder) =>
      await request(process.env.REACT_APP_API_URL_DEV!, UPDATE_ORDER, {
        id,
        new_order,
      }),
    {
      onMutate: async (new_order) => {
        await queryClient.cancelQueries("getSurveyById");
        const previousOrder: INewOrder | undefined =
          queryClient.getQueryData("getSurveyById");
        if (previousOrder) {
          queryClient.setQueryData("getSurveyById", {
            ...previousOrder,
            new_order: [...previousOrder.new_order, { new_order }],
          });
        }
        return { previousOrder };
      },
      onError: (err, variables, context: any) => {
        if (context?.previousOrder) {
          queryClient.setQueryData<ISurvey>(
            "getSurveyById",
            context.previousOrder
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("getSurveyById");
      },
    }
  );
