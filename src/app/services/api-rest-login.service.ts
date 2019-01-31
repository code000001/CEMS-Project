import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8081/cems/login';

@Injectable({
  providedIn: 'root'
})
export class ApiRestLoginService {

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
  getLoginData(httpHeaders, httpBody): Observable<any> {
    return this.http.post(endpoint, httpBody, ({headers : httpHeaders})).pipe(map(this.extractData));
  }
}