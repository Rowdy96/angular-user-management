import { Component, DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../authentication-services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements DoCheck {

  email: string;
  password: string;
  showSpinner: boolean;
  loginError : string;

  constructor(private router: Router, private accountService : AccountService) 
  {
    this.showSpinner = false;
    this.password ='';
    this.loginError = '';
  }
  ngDoCheck(): void {
    
    //TODO:  This will be removed
    // if(this.loginError.length !== 0 && (this.email || this.password)){
    //   this.loginError='';
    // }
  }

  /**
   * This method is used to call login method of account service to login in to application.
   */
  login(): void {
    this.accountService.login(this.email,this.password).subscribe(
      res =>{
        if(res.length === 0){
          this.router.navigate(['users']);
        }
        else
        {
          this.loginError = res;
        }
      },
      err =>{
        this.loginError = err;
      }
    );
  }

}
