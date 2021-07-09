export interface ICreateAppDTO {

    valor: string;
  }

export interface IUpdateAppDTO extends ICreateAppDTO {
    id: string;
}