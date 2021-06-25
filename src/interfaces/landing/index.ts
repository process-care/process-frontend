import { IBase64 } from "components/Fields/Uploadfile";

export interface IColors {
  base: string;
  button: string;
}

export interface IMember {
  name: string;
  job: string;
  //   image: string;
}

export interface ILanding {
  id: string;
  color_theme: IColors;
  image_cover: string;
  logo: string;
  members: [] | any;
  subtitle: string;
  title: string;
  video_url: string;
  wysiwyg: string;
  partner_logos: IBase64[];
}
