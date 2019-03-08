import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, Role } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private path = 'http://localhost:8081/cems';
    endpoint = 'http://localhost:8081/cems/login';
    userDataEndpoint = 'http://localhost:8081/cems/getUserData/';
    private httpHeaders: HttpHeaders;
    private httpHeadersRes: HttpHeaders;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        if (this.currentUserSubject.value) {
            this.setHeader(this.currentUserValue.accLogin, this.currentUserValue.accPassword);
            this.setHeaderRes(this.currentUserValue.accLogin, this.currentUserValue.accPassword);
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

    public get gethttpHeadersRes(): HttpHeaders {
        return this.httpHeadersRes;
    }

    protected setHeader(user: string, pass: string) {
        this.httpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(user + ':' + pass),
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    }

    protected setHeaderRes(user: string, pass: string) {
        this.httpHeadersRes = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(user + ':' + pass),
            'Content-Type': 'application/json'
        });
    }

    isSignin(): boolean {
        if (this.currentUser != null) {
            return true;
        }
        return false;
    }

    isUser(): boolean {
        // console.log("++",this.currentUserValue.accTypeId);
        return this.currentUser && this.currentUserValue.accTypeId === Role.User;
    }

    isStaff(): boolean {
        return this.currentUser && this.currentUserValue.accTypeId === Role.Staff;
    }

    isAgent(): boolean {
        return this.currentUser && this.currentUserValue.accTypeId === Role.Agent;
    }

    isAdmin(): boolean {
        return this.currentUser && this.currentUserValue.accTypeId === Role.Admin;
    }

    login(username: string, password: string) {
        const httpBody = 'acc_login=' + username;
        this.setHeader(username, password);
        return this.http.post<any>(this.endpoint, httpBody, ({ headers: this.httpHeaders }))
            .pipe(map(user => {
                setTimeout(() => {
                  }, 800);
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
