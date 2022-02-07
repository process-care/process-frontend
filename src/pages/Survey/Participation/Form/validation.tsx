import * as Yup from "yup";
import { QuestionEntity } from "api/graphql/sdk.generated";

const getTypeValidation = (item: QuestionEntity) => {
  const type = item.attributes?.type;

  switch (type) {
    case 'select':
    case 'radio':
    case 'text_area':
      return Yup.string();

    case 'number_input':
      return Yup.number();

    case 'date_picker':
      return Yup.date();

    case 'checkbox':
      return Yup.array().min(1, "Merci de cocher au moins une valeur");

    default:
      return Yup.mixed();
  }
};

export const formSchema: any = (questions: QuestionEntity[] | undefined) => {
  if (!questions) return {};

  const res = questions.reduce(
    (obj, item) => {
      if (!item.id) return obj;

      return {
        ...obj,
        [item.id]: item.attributes?.required
          ? getTypeValidation(item).required('Merci de bien vouloir renseigner ce champs')
          : getTypeValidation(item),
      };
  }, {} as Record<string, any>);

  return Yup.object().shape(res);
};
