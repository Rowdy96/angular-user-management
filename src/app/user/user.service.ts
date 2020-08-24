import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { 
    this.baseUrl = 'api/users';
  }

  /** GET Useres from the server */
  getUseres(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  /** GET User by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }

  //////// Save methods //////////

  /** POST: add a new User to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  /** DELETE: delete the User from the server */
  deleteUser(User: User | number): Observable<User> {
    const id = typeof User === 'number' ? User : User.id;
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<User>(url);
  }

  /**
   * Update the user details in the server
   * @param user object of user
   */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.baseUrl, user);
  }

}

