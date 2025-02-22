export interface ICreateSangKien {
  title: string;
  author: string;
  thumb?: string;
  sound?: string
}

export type IUpdateSangKien = {
  id: number,
  title?: string,
  author?: string,
  thumb?: string;
  sound?: string
}