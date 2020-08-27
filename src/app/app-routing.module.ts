import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {LoginGuard} from '../app/authentication-services/login.guard'

const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m=>m.UserModule)
  },
  { path: '', component: LoginComponent,canActivate: [LoginGuard] },
  { path:"**", pathMatch:'full',redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
