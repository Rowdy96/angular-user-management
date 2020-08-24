import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  id: number;
  selectable : boolean;
  removable : boolean;
  addOnBlur :  boolean;
  separatorKeysCodes: number[];
  constructor(private userService: UserService, private router: Router) { 
    this.user = new User();
    this.id = 1;
    this.addOnBlur = true;
    this.removable = true;
    this.selectable = true;
    this.separatorKeysCodes = [ENTER,COMMA]
  }

  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe(
      res =>{
        this.user = res;
      }
    )
  }

  add(event): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.user.hobbies.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(hobbie: string): void {
    const index = this.user.hobbies.indexOf(hobbie);

    if (index >= 0) {
      this.user.hobbies.splice(index, 1);
    }
  }

  getImageFile(event): void{
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.user.photo = reader.result.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  save(): void{
    this.userService.updateUser(this.user).subscribe(
     res => {
       this.router.navigate(['users']);
     }
    );
  }


}
