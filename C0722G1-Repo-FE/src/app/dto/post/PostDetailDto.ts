export interface PostDetailDto {
  idPost?: number;

  namePost?: string;

  note?: string;

  price?: number;

  dateCreation?: string;

  nameDirection?: string;

  nameStatusPost?: string;

  numberAddress?: string;

  nameDemandType?: string;

  nameLandType?: string;

  nameWards?: string;

  nameDistrict?: string;

  nameCity?: string;

  nameCustomer?: string;

  emailCustomer?: string;

  phoneCustomer1?: string;

  genderCustomer?: number;

  idCustomer?: number;

  idDemandType?: number;

  area?: number;

  approval?: boolean;

  flagDeleted?: boolean;
}
