import { Component, DoCheck } from '@angular/core';
import { User } from './models/user.model';
import { AccountService } from './authentication-services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  currentUser: User;

  constructor(private accountService: AccountService,private router: Router){

  }
  ngDoCheck(): void{
    this.currentUser = this.accountService.currentUser;
  }

  logout(): void{
    this.accountService.currentUser = new User();
    this.router.navigate(['login']);
  }
}
