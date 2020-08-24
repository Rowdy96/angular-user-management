import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  currentUser: User;
  loginError: string;
  constructor(private userService:  UserService) 
  {
    this.currentUser = new User();
    this.loginError = '';
  }

  login(email: string, password: string): void{
    
    this.userService.getUseres().subscribe(
      res => {
        this.currentUser = res.find(x => x.email === email && x.password === password);
      },
      err =>{
        this.loginError = 'Email/Password is not correct.'
        this.currentUser = null;
      }
    );
    
  }
}
