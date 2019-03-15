import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { Userappform } from '../_models/userappform';

@Injectable({
  providedIn: 'root'
})
export class AppFormService {
  private httpHeaders: HttpHeaders;
  private httpHeadersRes: HttpHeaders;
  private currentUser: User;
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.httpHeadersRes = this.authenticationService.gethttpHeadersRes;
    this.httpHeaders = this.authenticationService.gethttpHeaders;
    this.currentUser = this.authenticationService.currentUserValue;
  }

  errorHander(error: HttpErrorResponse) {
    // console.log("err status : ",error.status);
    return Observable.throw(error.message);
  }

  getINS02(): Observable<any> {
    return this.http.get<any>(`${this.authenticationService.path_url}/getINS/${this.currentUser.userId}`, ({ headers: this.httpHeadersRes }))
      .pipe(map(this.extractData), catchError(this.errorHander));
  }

  getProvince(): Observable<any> {
    return this.http.get<any>(`${this.authenticationService.path_url}/getProvinces`, ({ headers: this.httpHeaders }))
      .pipe(map(data => { //console.log("req data => ",data);
      return data}), catchError(this.errorHander));
  }

  getAmphure(pv_id : number): Observable<any> {
    return this.http.get<any>(`${this.authenticationService.path_url}/getAmphures/${pv_id}`, ({ headers: this.httpHeaders }))
      .pipe(map(data => { //console.log("req data => ",data);
      return data}), catchError(this.errorHander));
  }

  getDistrict(amp_id : number): Observable<any> {
    return this.http.get<any>(`${this.authenticationService.path_url}/getDistricts/${amp_id}`, ({ headers: this.httpHeaders }))
      .pipe(map(data => { //console.log("req data => ",data);
      return data}), catchError(this.errorHander));
  }
}
