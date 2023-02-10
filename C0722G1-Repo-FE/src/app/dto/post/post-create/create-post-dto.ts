export interface CreatePostDto {
  idCustomer: number;
  namePost: string;
  idDemand: number;
  idLandType: number;
  idWards: number;
  idDirection: number;
  numberAddress: string;
  price: number;
  area: number;
  note?: string;
  imageListURL: string[];
}
