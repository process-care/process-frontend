import * as Yup from "yup";

export const newPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      // @ts-ignore
      "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
      "Le mot de passe doit contenir au moins 8 charcatères, une majuscule, une minuscule, un nombre et un charactère spécial"
    )
    .required("Ce champs est requis"),
  passwordConfirmation: Yup.string()
    .required("Ce champs est requis")
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe ne sont pas identiques"
    ),
});
