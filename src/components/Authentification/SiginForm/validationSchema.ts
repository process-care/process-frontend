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
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Ce champs est requis"),
  confirmPassword: Yup.string()
    .required("Ce champs est requis")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
