export interface ICreateAppDTO {
    id: string;
    valor: string;
  }

export interface IUpdateAppDTO extends ICreateAppDTO {
    id: string;
}