import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const user = this.accountService.currentUser;
    
    if(user === undefined){
      return false;
    }

    if (user.email !== undefined) {
        return true;
    }

    this.router.navigate(['/login']);
    return false;
}
}
