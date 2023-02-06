export class AccountDto {
  idAccount: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(idAccount: number, currentPassword: string, newPassword: string, confirmPassword: string) {
    this.idAccount = idAccount;
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}
