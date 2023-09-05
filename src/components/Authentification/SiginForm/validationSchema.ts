import * as Yup from "yup";

export const SigninSchema = Yup.object().shape({
  username: Yup.string().email("Email invalide").required("Ce champs est requis"),
  password: Yup.string()
    // .matches(
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
    //   "Le mot de passe doit contenir au moins 8 charcatères, une majuscule, une minuscule, un nombre et un charactère spécial"
    // )
    .required("Ce champs est requis")
    .min(6, "Le mot de passe doit contenir au moins 6 charactères"),
  confirmPassword: Yup.string()
    .required("Ce champs est requis")
    // FIXME:  null is not assignable to type 'string | something'
    .oneOf([Yup.ref("password")/*, null*/], "Les mots de passe ne sont pas identiques")
    .min(6, "Le mot de passe doit contenir au moins 6 charactères"),
  cgv: Yup.array().length(1, "Vous devez accepter les CGV"),
});

export const LoginSchema = Yup.object().shape({
  identifier: Yup.string()
    .email("Identifiant invalide - ce champs doit avoir un format email")
    .required("Ce champs est requis"),
  password: Yup.string().required("Ce champs est requis"),
});
