import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject,Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { Userappform } from '../_models/userappform';

@Injectable({
  providedIn: 'root'
})
export class AppFormService {
  private httpHeaders : HttpHeaders;
  private currentUser : User;

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) { 
    this.httpHeaders = this.authenticationService.gethttpHeaders;
    this.currentUser = this.authenticationService.currentUserValue;
  }

  errorHander(error : HttpErrorResponse){
    return Observable.throw(error.message);
  }

  getINS02() : Observable<any> {
    return this.http.get<any>( `${this.authenticationService.path_url}/getINS/${this.currentUser.userId}`, ({ headers: this.httpHeaders }))
    .pipe(map(res => {console.log('res => ',res);return res;}),catchError(this.errorHander));
  }
}
