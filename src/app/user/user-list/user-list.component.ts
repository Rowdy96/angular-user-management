import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/authentication-services/account.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<User>;

  constructor(private accountService: AccountService, private router: Router) {
    this.displayedColumns = ['photo','name', 'email', 'edit'];
  }

  ngOnInit(): void {
    this.accountService.getAllUser().subscribe(res => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
    });
  }
 
  /**
   * This method is used to navigate edit user page.
   * @param id of user.
   */
  onClick(id: number): void{
   this.router.navigate(['users/edit-user',id]); 
  }

}
