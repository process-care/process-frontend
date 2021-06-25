import { IBase64 } from "components/Fields/Uploadfile";

export interface IColors {
    base: string,
    button: string
}

export interface ILanding {
    id: string,
    color_theme: IColors,
    image_cover: string,
    logo: string,
    member: string,
    photo_member: string,
    subtitle: string,
    title: string,
    video_url: string,
    wysiwyg: string,
    partner_logos: IBase64[]

}