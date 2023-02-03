import {Account} from "../account/account";

export interface Customer {
  idCustomer?: number;
  nameCustomer?: string;
  emailCustomer?: string;
  addressCustomer?: string;
  idCardCustomer?: string;
  codeCustomer?: string;
  genderCustomer?: number;
  dateOfBirthCustomer?: string;
  flagDelete?: boolean;
  approvalCustomer?: number;
  phoneCustomer1?: string;
  phoneCustomer2?: string;
  accountCustomer?: Account;
}
