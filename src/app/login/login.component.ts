import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../authentication-services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  email: string;
  password: string;
  showSpinner: boolean;
  loginError : string;

  constructor(private router: Router, private accountService : AccountService) 
  {
    this.showSpinner = false;
    this.password ='';
    this.email = '';
    this.loginError = '';
  }

  ngOnInit(): void {
  
  }

  ngDoCheck(): void {
    this.loginError = this.accountService.loginError;
  }


  login(): void {
    this.accountService.login(this.email,this.password);
    this.router.navigate(['users']);
  }
}
