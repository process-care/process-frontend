import IQuestion from "types/form/question";
import * as Yup from "yup";

const getTypeValidation = (item: IQuestion) => {
  if (item.type === "number_input") {
    return Yup.number();
  }
  if (item.type === "date_picker") {
    return Yup.date();
  }
  if (item.type === "select") {
    return Yup.string();
  }
  if (item.type === "radio") {
    return Yup.string();
  }
  if (item.type === "checkbox") {
    return Yup.array().min(1, "Merci de cocher au moins une valeur");
  }
  if (item.type === "text_area") {
    return Yup.string();
  } else return Yup.mixed();
};

export const formSchema: any = (questions: IQuestion[] | undefined) => {
  if (questions) {
    const res = questions.reduce(
      (obj, item) => ({
        ...obj,
        [item.id]: item.required
          ? getTypeValidation(item).required(
              "Merci de bien vouloir renseigner ce champs"
            )
          : getTypeValidation(item),
      }),
      {}
    );
    return Yup.object().shape(res);
  } else return {};
};
