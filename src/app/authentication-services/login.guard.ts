import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private accountService: AccountService,private router: Router){}
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {

    if(!this.accountService.userValue){
      return true;
    }
    this.router.navigate(['users']);
    false;
  }
  
}
