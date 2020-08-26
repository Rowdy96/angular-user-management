import { Component, DoCheck, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../authentication-services/account.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  showSpinner: boolean;
  loginError : string;
  constructor( private route: ActivatedRoute,private router: Router, private accountService : AccountService) 
  {
    this.showSpinner = false;
    this.password ='';
    this.loginError = '';
  }
  
  ngOnInit(): void{
  
  }
  /**
   * This method is used to call login method of account service to login in to application.
   */
  login(): void {

    this.accountService.login(this.email, this.password)
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['/users']);
        },
        error => {
            this.loginError = error;
        }); 
  }

}
