import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Ce champs est requis"),
});
