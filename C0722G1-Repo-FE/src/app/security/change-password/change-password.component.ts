import {Component, OnInit} from '@angular/core';
import {Account} from '../../entity/account/account';
import {FormControl, FormGroup} from '@angular/forms';
import {AccountService} from '../../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  account: Account[] = [];
  updateForm: FormGroup;

  constructor(private accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.updateForm = new FormGroup({
      idAccount: new FormControl(),
      usernameAccount: new FormControl(),
      encryptPassword: new FormControl()
    });

    this.activatedRoute.paramMap
  }

  ngOnInit(): void {
  }

}
