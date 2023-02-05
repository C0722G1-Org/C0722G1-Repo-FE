import {Division} from './division';
import {Account} from '../account/account';

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
  division?: Division;
  account?: Account;
}
