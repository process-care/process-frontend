import { ILanding } from "types/landing";
import { colors } from "./../../ColorPicker/utils";

export const initialValues: ILanding = {
  id: "",
  color_theme: colors[0],
  cover: "",
  logo: "",
  members: [],
  subtitle: "",
  title: "",
  video_url: "",
  wysiwyg: "",
  partners: [],
  partners_logos: [],
  about_page: "",
};
