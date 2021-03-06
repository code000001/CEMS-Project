import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'http://localhost:8081/cems/student_qc';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Basic ' + btoa('admin:admin'),
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiRestTestService {

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
  getTestData(): Observable<any> {
    return this.http.get(endpoint, httpOptions).pipe(
      map(this.extractData));
  }
}
