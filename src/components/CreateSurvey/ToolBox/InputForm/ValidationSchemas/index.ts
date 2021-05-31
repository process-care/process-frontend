import * as Yup from "yup";

export const CommonFieldsSchema = Yup.object().shape({
  label: Yup.string()
    .min(2, "Texte trop court (2min)")
    .max(50, "Texte trop long (50max)")
    .required("Ce champs est requis"),

  internal_title: Yup.string()
    .min(2, "Texte trop court (2min)")
    .max(50, "Texte trop long (50max)")
    .required("Ce champs est requis"),
});

// Common + options
export const MultipleInputFieldsSchema = CommonFieldsSchema.shape({
  options: Yup.array().nullable().min(2, "Il faut au moins deux réponses"),
  // .required("Merci de renseigner deux réponses au minumum"),
});

// Slider

export const SliderSchema = CommonFieldsSchema.shape({
  min: Yup.number().required("Ce champs est requis"),
  max: Yup.number().required("Ce champs est requis"),
  step: Yup.number().required("Ce champs est requis"),
});

// Slider

export const WysiwygSchema = Yup.object().shape({
  internal_title: Yup.string().required("Ce champs est requis"),
  wysiwyg: Yup.string(),
});
