export interface ICreateSangKien {
    title: string;
    author: string;
  }

export type IUpdateSangKien = {
    id: number,
    title?: string,
    author?: string
}