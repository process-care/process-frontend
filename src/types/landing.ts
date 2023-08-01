import { IBase64 } from "@/components/Fields/Uploadfile";

export interface Media {
  id: string;
  name: string;
  url: string;
}

export interface Color {
  base: string;
  button: string;
}

export interface Member {
  name: string;
  job: string;
  image: IBase64["base64"];
  color?: string;
  isUserView?: boolean;
}
