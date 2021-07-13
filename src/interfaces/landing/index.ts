import { IBase64 } from "components/Fields/Uploadfile";

export interface IColors {
  base: string;
  button: string;
}

export interface IMember {
  name: string;
  job: string;
  image: IBase64["base64"];
}

export interface ILanding {
  id: string;
  color_theme: IColors;
  image_cover: IBase64[];
  logo: string;
  members: IMember[];
  subtitle: string;
  title: string;
  video_url: string;
  wysiwyg: string;
  partner_logos: IBase64[];
}

export interface ILandingRes {
  landing: ILanding;
}
