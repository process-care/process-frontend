import { SigninForm } from "components/Authentification/SiginForm";
import React from "react";
import IRoute from "types/routes/route";

export const Signin: React.FC<IRoute> = () => {
  return (
    <div className="background__grid">
      <SigninForm />
    </div>
  );
};
