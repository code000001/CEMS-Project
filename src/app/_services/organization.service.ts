import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap ,map} from 'rxjs/operators'
import {OrganizationDataInterface} from '../interfaces/organization/organization-data-interface';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    })
  };

@Injectable()
export class OrganizationService {

    apiAnnUrl = 'http://localhost:8081/cems/announcement_organization_data'

    constructor(
        private http: HttpClient,private https:HttpClientModule) { }

    get(): Observable<OrganizationDataInterface[]> {
        return this.http.get<OrganizationDataInterface[]>(this.apiAnnUrl)
    }
}