import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap} from 'rxjs/operators';
import { User } from '../models/user.model';

// array in local storage for registered users.
let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // create delay to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(delay(500));


        function handleRoute(): Observable<HttpEvent<any>> {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticateUser();
                case url.endsWith('/users/register') && method === 'POST':
                    return registerUser();
                case url.endsWith('/users') && method === 'GET':
                    return getAllUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                default:
                    return next.handle(request);
            }    
        }

        // functions to deal with route

        function authenticateUser(): Observable<HttpResponse<any>> {
            const { email, password } = body;
            const user = users.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
            if (!user) return error('Username or password is incorrect');
            user.token = 'fake-jwt-token';
            return ok(user);
        }

        function registerUser(): Observable<HttpResponse<any>> {
            const user: User = body

            if (users.find(x => x.email.toLowerCase() === user.email.toLowerCase())) {
                return error(`"${user.email}" email is already taken`);
            }

            user.id = users.length+1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getAllUsers(): Observable<HttpResponse<any>> {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUserById(): Observable<HttpResponse<any>> {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function updateUser(): Observable<HttpResponse<any>> {
            if (!isLoggedIn()) return unauthorized();

            let updatedUser = body;
            let user = users.find(x => x.id === idFromUrl());

            // update and save user
            Object.assign(user, updatedUser);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }


        function ok(body?): Observable<HttpResponse<any>> {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message): Observable<never> {
            return throwError({ error: { message } });
        }

        function unauthorized(): Observable<never> {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn(): boolean {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl(): number {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend for backendless development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};