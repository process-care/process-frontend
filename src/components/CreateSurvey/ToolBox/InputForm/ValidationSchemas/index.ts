import * as Yup from "yup";

export const CommonFieldsSchema = Yup.object().shape({
  label: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Ce champs est requis"),
  internal_title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Ce champs est requis"),
});

export const MultipleInputFieldsSchema = CommonFieldsSchema.shape({
  options: Yup.array().min(2, "Il faut au moins deux réponses"),
});
