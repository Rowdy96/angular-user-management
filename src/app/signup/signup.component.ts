import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { User } from 'src/app/models/user.model';
import { AccountService } from '../authentication-services/account.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  firstName: string;
  lastName: string;
  hobbies: string[];
  visible : boolean;
  selectable : boolean;
  removable : boolean;
  addOnBlur :  boolean;
  imageBase64: string;
  user: User;
  isHobbieSectionCliked: boolean;
  signUpError: string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private router: Router , private accountService: AccountService) 
  {
    this.firstName = '';
    this.lastName = '';
    this.user =  new User();
    this.user.gender = 'Male';
    this.hobbies = new Array<string>();
    this.removable = true;
    this.selectable = true;
    this.isHobbieSectionCliked = false;
    this.signUpError= '';
  }

  ngOnInit(): void {
    
  }

  /**
   * This methos is used to add hobby to user's hobby list.
   * @param event is to get hobbie.
   */
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

  /**
   * This method is used to remove hobbie from hobby list of user.
   * @param hobbie is hobbie name.
   */
  remove(hobbie: string): void {
    const index = this.hobbies.indexOf(hobbie);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  /**
   * This method is used to get image file and convert image to base64.
   * @param event is get image file.
   */
  getImageFile(event): void{
    
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageBase64 = reader.result.toString();
      this.user.photo = this.imageBase64;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  /**
   * This method turn isHobbieSectionCliked value true when hobby section is clicked.
   */
  onClick(): void{
    this.isHobbieSectionCliked = true;
  }

  /**
   * This method is used to register the new user to the application.
   */
  resgister():void{
    
    this.user.name = `${this.firstName} ${this.lastName}`;
    this.user.hobbies = this.hobbies;
    this.accountService.register(this.user).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err =>{
        this.signUpError= err;
      }
    );
  }


}
