import {Division} from './division';

export interface Employee {
  idEmployee?: number;
  codeEmployee?: string;
  nameEmployee?: string;
  dateOfBirth?: string;
  genderEmployee?: boolean;
  phoneEmployee?: string;
  emailEmployee?: string;
  addressEmployee?: string;
  flagDeleted?: string;
  nameDivision?: string;
  division?: Division;
  account?: Account;

}
