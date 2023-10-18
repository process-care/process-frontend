import * as Yup from "yup"

export const CommonFieldsSchema = Yup.object().shape({
  label: Yup.string()
    .min(2, "Texte trop court (2 min)")
    .max(4000, "Texte trop long (4000 max)")
    .required("Ce champs est requis"),

  internal_title: Yup.string().min(2, "Texte trop court (2 min)").max(500, "Texte trop long (500 max)"),
  // .required("Ce champs est requis"),
});

// Common + answers
export const MultipleInputFieldsSchema = CommonFieldsSchema.shape({
  options: Yup.array().nullable().min(2, "Il faut au moins deux réponses"),
  // .required("Merci de renseigner deux réponses au minumum"),
});

// Slider

export const SliderSchema = CommonFieldsSchema.shape({
  min: Yup.number()
    .required("Ce champs est requis")
    .lessThan(Yup.ref("max"), "La valeur minimale doit être inférieure à la valeur maximale"),
  max: Yup.number()
    .required("Ce champs est requis")
    .moreThan(Yup.ref("min"), "La valeur maximale doit être supérieur à la valeur minimale"),
  step: Yup.number().required("Ce champs est requis"),
});

// Slider

export const WysiwygSchema = Yup.object().shape({
  internal_title: Yup.string().required("Ce champs est requis"),
  infozone: Yup.array(),
});

// Associated Classification

export const AssociatedSchema = CommonFieldsSchema.shape({
  factors: Yup.array().required("Merci de renseigner un facteur au minumum"),
});
