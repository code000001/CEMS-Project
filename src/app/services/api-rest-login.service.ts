import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8081/cems/login';

@Injectable({
  providedIn: 'root'
})
export class ApiRestLoginService {

  private auth_header = new BehaviorSubject<HttpHeaders>(new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}));
  current_auth = this.auth_header.asObservable();
  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
  getLoginData(httpHeaders, httpBody): Observable<any> {
    this.auth_header.next(httpHeaders);
    console.log(this.auth_header);
    return this.http.post(endpoint, httpBody, ({headers : httpHeaders})).pipe(map(this.extractData));
  }
}
