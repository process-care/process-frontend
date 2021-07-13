import { ILanding } from "interfaces/landing";
import { colors } from "./../../ColorPicker/utils";

export const initialValuesLanding: ILanding = {
  id: "",
  color_theme: colors[0],
  image_cover: [],
  logo: { base64: "", name: "" },
  members: [],
  subtitle: "",
  title: "",
  video_url: "",
  wysiwyg: "",
  partner_logos: [],
};

export const initialValuesAbout = {
  wysiwyg: "",
};
