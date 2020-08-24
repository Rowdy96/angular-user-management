import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string;

  constructor(private http : HttpClient) { 
    this.baseUrl = 'api/users';
  }

  /** 
   * GET Useres from the server.
   */
  getUseres(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  /** 
   * GET User by id. Will 404 if id not found.
   * @param id of user.
   */
  getUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }

  /**
   *  add a new User to the server.
   *  @param user object of user.
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  /**
   * Update the user details in the server.
   * @param user object of user.
   */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.baseUrl, user);
  }

}

