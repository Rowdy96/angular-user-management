import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from '../authentication-services/auth-guard.service';
import { MaterialsModule } from '../sharedModules/materials/materials.module';


@NgModule({
  declarations: [UserListComponent, EditUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MaterialsModule
  ],
  providers: [AuthGuardService]
})
export class UserModule { }
