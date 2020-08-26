import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.currentUser = this.userSubject.asObservable();
    }

    //Returns the current user value.
    public get userValue(): User {
        return this.userSubject.value;
    }

    /**
     * Login the user in application.
     * @param email of user.
     * @param password of user.
     */
    login(email: string, password: string): Observable<User> {

        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    /**
     * Logout user from the application.
     */
    logout(): void {
        
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    /**
     * Register the new user.
     * @param user object of new user.
     */
    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    /**
     * Fetch all users from the backend.
     */
    getAllUser(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    /**
     * Fetch user according to user id.
     * @param id of user.
     */
    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    /**
     * Update the user details in the backend.
     * @param id of user.
     * @param updatedUser user.
     */
    updateUser(id, updatedUser) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, updatedUser)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update current user local storage
                    const user = { ...this.userValue, ...updatedUser };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }
}

