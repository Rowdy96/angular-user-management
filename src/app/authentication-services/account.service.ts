import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  currentUser: User;
  constructor(private userService:  UserService, private router: Router) 
  {
    this.currentUser = new User();
  }

  login(email: string, password: string): Observable<string>{
    let error = '';
     return this.userService.getUseres().pipe(map(
       res=> 
       {
        this.currentUser = res.find(x=>x.email === email && x.password === password);
        if(this.currentUser === null || this.currentUser === undefined){
                this.currentUser = new User();
                error = 'Invalid Email/Password.Please try agian.!';
          }
        return error;
       },
       err =>{
         error = 'Something went wrong. Please try again!';
       }
     ));
    
  }

}
