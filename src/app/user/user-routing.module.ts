import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AuthGuardService } from '../authentication-services/auth-guard.service'

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
