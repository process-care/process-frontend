import { IBase64 } from "components/Fields/Uploadfile";

export interface Media {
  id: string;
  name: string;
  url: string;
}

export interface IColor {
  base: string;
  button: string;
}

export interface IMember {
  name: string;
  job: string;
  image: IBase64["base64"];
  color?: string;
}

export interface ILanding {
  id: string;
  color_theme: IColor;
  cover: string;
  partners: Media[];
  logo: string;
  members: IMember[];
  subtitle: string;
  title: string;
  video_url: string;
  wysiwyg: string;
  partner_logos: IBase64[];
  about_page: string;
}

export interface ILandingRes {
  landing: ILanding;
}
