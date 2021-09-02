import * as Yup from "yup";

export const createSurveySchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Texte trop court (2min)")
    .max(200, "Texte trop long (200max)")
    .required("Ce champs est requis"),

  // slug: Yup.string()
  //   .min(2, "Texte trop court (2min)")
  //   .max(90, "Texte trop long (50max)")
  //   .trim("Merci de ne pas mettre d'espace")
  //   .strict()

  //   .required("Ce champs est requis"),
});
