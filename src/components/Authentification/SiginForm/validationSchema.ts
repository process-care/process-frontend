import * as Yup from "yup";

export const SigninSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Texte trop court (2min)")
    .max(200, "Texte trop long (200max)")
    .required("Ce champs est requis"),
  name: Yup.string()
    .min(2, "Texte trop court (2min)")
    .max(200, "Texte trop long (200max)")
    .required("Ce champs est requis"),
  job: Yup.string(),
  institution: Yup.string(),
  email: Yup.string().email("Email invalide").required("Ce champs est requis"),
  password: Yup.string()
    .matches(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
      "Le mot de passe doit contenir au moins 8 charcatères, une majuscule, une minuscule, un nombre et un charactère spécial"
    )
    .required("Ce champs est requis"),
  confirmPassword: Yup.string()
    .required("Ce champs est requis")
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe ne sont pas identiques"
    ),
});
