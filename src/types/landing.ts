export interface Media {
  id: string
  name: string
  url: string
}

export interface Color {
  base: string
  button: string
}

export interface Member {
  name: string
  job: string
  image: string
  color?: string
  isUserView?: boolean
}
