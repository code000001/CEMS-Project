import { Injectable } from '@angular/core';
import { StudentdataInterface } from '../_models/stu-data-interface';
import { HttpClient, HttpHeaders, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthenticationService } from '../_services';


@Injectable({
  providedIn: 'root'
})
export class StaffHrManagementService {
  httpHeadersRes: HttpHeaders;
  private httpHeaders: HttpHeaders;
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.httpHeadersRes = this.authenticationService.gethttpHeadersRes;
    this.httpHeaders = this.authenticationService.gethttpHeaders;
  }

  getAllStudentTrainning(): Observable<StudentdataInterface[]> {
    return this.http.get<StudentdataInterface[]>(`${this.authenticationService.path_url}/train`,
      ({ headers: this.httpHeaders }))
  }
}
