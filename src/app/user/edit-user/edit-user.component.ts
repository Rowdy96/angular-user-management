import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/authentication-services/account.service';

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
  constructor(private route: ActivatedRoute,private accountService: AccountService, private router: Router) { 
    this.user = new User();
    this.id = +this.route.snapshot.params['id'];
    this.addOnBlur = true;
    this.removable = true;
    this.selectable = true;
    this.separatorKeysCodes = [ENTER,COMMA]
  }

  ngOnInit(): void {
    this.accountService.getUserById(this.id).subscribe(
      res =>{
        this.user = res;
      }
    )
  }

  /**
   * Add the hobbie into the user hobbie list.
   * @param event is used to get hobbie.
   */
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

  /**
   * Removes the hobbie from user hobbie list.
   * @param hobbie is hobbie name.
   */
  remove(hobbie: string): void {
    const index = this.user.hobbies.indexOf(hobbie);

    if (index >= 0) {
      this.user.hobbies.splice(index, 1);
    }
  }

  /**
   * Get image from the user and convert it into base64.
   * @param event is get image file.
   */
  getImageFile(event): void{
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.user.photo = reader.result.toString();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  /**
   * Save the edited user detais.
   */
  save(): void{
    this.accountService.updateUser(this.id,this.user).subscribe(
     res => {
       this.router.navigate(['users']);
     }
    );
  }


}
