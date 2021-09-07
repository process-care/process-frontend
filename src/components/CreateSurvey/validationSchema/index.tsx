import * as Yup from "yup";

export const createSurveySchema = Yup.object().shape({
  title: Yup.string()
    // .min(2, "Texte trop court (2min)")
    .max(250, "Texte trop long (250max)")
    .required("Ce champs est requis"),
  description: Yup.string(),
  language: Yup.string(),
  email: Yup.string().email("Email invalide").required("Ce champs est requis"),

  // slug: Yup.string()
  //   .min(2, "Texte trop court (2min)")
  //   .max(90, "Texte trop long (50max)")
  //   .trim("Merci de ne pas mettre d'espace")
  //   .strict()

  //   .required("Ce champs est requis"),
});
