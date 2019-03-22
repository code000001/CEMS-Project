import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { OrganizationDataInterface } from '../_models/organization-data-interface';
import {AnouncementInterface} from '../_models/announcement-interface';
import {LogKnowledgeInterface} from '../_models/log-knowledge-req-interface';
import {KnowledgeRequirementInterface} from '../_models/knowledge-requirement-interface';
import {LogPositionInterface} from '../_models/log-position-interface';
import {PositionDataInterface} from '../_models/position-data-interface';

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

  getAnnByorgId(id:number): Observable<AnouncementInterface[]> {
    return this.http.get<AnouncementInterface[]>(`${this.authenticationService.path_url}/announcement_org/${id}`,({ headers: this.httpHeaders }))
  }

  getLogKnowledgeBylogkAnnId(logkAnnId:number): Observable<LogKnowledgeInterface> {
    return this.http.get<LogKnowledgeInterface>(`${this.authenticationService.path_url}/announcement_logKnowledge/${logkAnnId}`,({ headers: this.httpHeaders }))
  }

  getKnowledgeReqById(id:number): Observable<KnowledgeRequirementInterface> {
    return this.http.get<KnowledgeRequirementInterface>(`${this.authenticationService.path_url}/announcement_knowledge/${id}`,({ headers: this.httpHeaders }))
  }

  getLogPositionBylogpAnnId(logpAnnId : number): Observable<LogPositionInterface>{
    return this.http.get<LogPositionInterface>(`${this.authenticationService.path_url}/announcement_logPosition/${logpAnnId}`,({ headers: this.httpHeaders }))
  }

  getPositionById(id:number) : Observable<PositionDataInterface>{
    return this.http.get<PositionDataInterface>(`${this.authenticationService.path_url}/announcement_position_data/${id}`,({ headers: this.httpHeaders }))
  }

  // gets(id:any): Observable<KnowledgeRequirementInterface> {
  //   return this.http.get<KnowledgeRequirementInterface>(`${this.authenticationService.path_url}/announcement_knowledge/${id}`,({ headers: this.httpHeaders }))
  // }
}