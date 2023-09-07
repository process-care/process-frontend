import { LandingRedux } from "@/redux/slices/types/index.js"
import { colors } from "./../../ColorPicker/utils/index.ts"

export const initialValues: LandingRedux["attributes"] = {
  color_theme: colors[0],
  cover: null,
  logo: null,
  members: [],
  subtitle: "",
  title: "",
  video_url: "",
  wysiwyg: "",
  partners_logos: [],
  about_page: "",
};
