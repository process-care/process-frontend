import { ILanding } from "interfaces/landing";
import { colors } from "./../../ColorPicker/utils";

export const initialValues: ILanding = {
  id: "",
  color_theme: colors[0],
  image_cover: [],
  logo: [],
  members: [],
  subtitle: "",
  title: "",
  video_url: "",
  wysiwyg: "",
  partner_logos: [],
};
