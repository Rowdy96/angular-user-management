import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { User } from 'src/app/models/user.model'
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstName: string;
  lastName: string;
  hobbies: string[];
  visible : boolean;
  selectable : boolean;
  removable : boolean;
  addOnBlur :  boolean;
  imageBlob: string;
  user: User;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private router: Router , private userService: UserService) 
  {
    this.firstName = '';
    this.lastName = '';
    this.user =  new User();
    this.user.gender = 'Male'
    this.hobbies = new Array<string>();
    this.removable = true;
    this.selectable = true;

  }

  ngOnInit() {
  }

  add(event): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.hobbies.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(hobbie: string): void {
    const index = this.hobbies.indexOf(hobbie);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  getImageFile(event): void{
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageBlob = reader.result.toString();
      console.log(this.imageBlob);
      this.user.photo = this.imageBlob;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  resgister():void{
    
    this.user.name = `${this.firstName} ${this.lastName}`;
    this.userService.addUser(this.user).subscribe(
      res => {
        this.router.navigate(['login']);
      },
      err =>{

      }
    );
  }


}
