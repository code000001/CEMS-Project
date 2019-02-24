import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private path = 'http://localhost:8081/cems';
    endpoint = 'http://localhost:8081/cems/login';
    userDataEndpoint = 'http://localhost:8081/cems/getUserData/';
    private httpHeaders: HttpHeaders;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        if (this.currentUserSubject.value) {
            this.httpHeaders = new HttpHeaders({
                'Authorization': 'Basic ' + btoa(this.currentUserValue.accLogin + ':' + this.currentUserValue.accPassword),
                'Content-Type': 'application/x-www-form-urlencoded'
            });
        }
    }

    public get path_url(): string {
        return this.path;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get gethttpHeaders(): HttpHeaders {
        return this.httpHeaders;
    }

    login(username: string, password: string) {
        const httpBody = 'acc_login=' + username;
        this.httpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(username + ':' + password),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        return this.http.post<any>(this.endpoint, httpBody, ({ headers: this.httpHeaders }))
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                user.accPassword = password;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
