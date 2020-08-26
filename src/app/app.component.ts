import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { AccountService } from './authentication-services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  currentUser: User;

  constructor(private accountService: AccountService,private router: Router){
    this.currentUser = new User();
  }

  ngOnInit(): void{
    this.accountService.currentUser.subscribe(x=> this.currentUser = x);
  }

  /**
   * This method is used to logout user from the application.
   */
  logout(): void{
    this.accountService.logout();
  }
}
