import { LandingRedux } from "redux/slices/types";
import { colors } from "./../../ColorPicker/utils";

export const initialValues: LandingRedux["attributes"] = {
  // TODO: Check if it's ok to remove id here
  // id: "",
  color_theme: colors[0],
  cover: "",
  logo: "",
  members: [],
  subtitle: "",
  title: "",
  video_url: "",
  wysiwyg: "",
  partners_logos: [],
  about_page: "",
};
