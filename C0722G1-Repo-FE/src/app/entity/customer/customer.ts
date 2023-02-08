import {Account} from '../account/account';

export interface Customer {

  /**
   * Create by: HocHH
   * Date created: 03/02/2023
   * Uses: List customer
   */
  id_customer?: number;
  name_customer?: string;
  email_customer?: string;
  address_customer?: string;
  idCard_customer?: string;
  code_customer?: string;
  gender_customer?: number;
  flag_delete?: boolean;
  approval_customer?: number;
  phone_customer1?: string;
  phone_customer2?: string;
  account?: Account;
  dateOfBirth?: string;
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
  encryptPassword?: string;


}
