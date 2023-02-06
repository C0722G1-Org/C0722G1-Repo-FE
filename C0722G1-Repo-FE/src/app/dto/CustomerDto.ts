export class CustomerDto {
  idCustomer: number;
  nameCustomer: string;
  phoneCustomer1: string;
  phoneCustomer2: string;
  idCardCustomer: string;
  emailCustomer: string;
  genderCustomer: number;
  dateOfBirth: string;
  addressCustomer: string;
  codeCustomer: string;

  // tslint:disable-next-line:max-line-length
  constructor(idCustomer: number, nameCustomer: string, phoneCustomer1: string, phoneCustomer2: string, idCardCustomer: string, emailCustomer: string, genderCustomer: number, dateOfBirth: string, addressCustomer: string, codeCustomer: string) {
    this.idCustomer = idCustomer;
    this.nameCustomer = nameCustomer;
    this.phoneCustomer1 = phoneCustomer1;
    this.phoneCustomer2 = phoneCustomer2;
    this.idCardCustomer = idCardCustomer;
    this.emailCustomer = emailCustomer;
    this.genderCustomer = genderCustomer;
    this.dateOfBirth = dateOfBirth;
    this.addressCustomer = addressCustomer;
    this.codeCustomer = codeCustomer;
  }
}
