import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { OrganizationDataInterface } from '../_models/organization-data-interface';


// const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json; charset=utf-8',
//       'Accept': 'application/json'
//     })
//   };

@Injectable()
export class OrganizationService {
  private httpHeaders: HttpHeaders;
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
  constructor(
    private http: HttpClient, private authenticationService: AuthenticationService) {
    this.httpHeaders = this.authenticationService.gethttpHeadersRes;
  }

  get(): Observable<OrganizationDataInterface[]> {
    return this.http.get<OrganizationDataInterface[]>(`${this.authenticationService.path_url}/announcement_organization_data`,
    ({ headers: this.httpHeaders }))
  }

  getDetailById(id: number): Observable<OrganizationDataInterface> {
    return this.http.get<OrganizationDataInterface>(`${this.authenticationService.path_url}/announcement_organization_data/${id}`,({ headers: this.httpHeaders }))
    
  }
}