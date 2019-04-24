import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { OrganizationDataInterface } from '../_models/organization-data-interface';
import { AnouncementInterface } from '../_models/announcement-interface';
import { LogKnowledgeInterface ,LogKnowledgeInterfacePost} from '../_models/log-knowledge-req-interface';
import { KnowledgeRequirementInterface } from '../_models/knowledge-requirement-interface';
import { LogPositionInterface ,LogPositionInterfacePost} from '../_models/log-position-interface';
import { PositionDataInterface } from '../_models/position-data-interface';
import { AnouncementInterfacePost } from '../_models/announcement-interface-post';

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
    return this.http.get<OrganizationDataInterface>(`${this.authenticationService.path_url}/announcement_organization_data/${id}`, ({ headers: this.httpHeaders }))
  }

  getAnnByorgId(id: number): Observable<AnouncementInterface[]> {
    return this.http.get<AnouncementInterface[]>(`${this.authenticationService.path_url}/announcement_org/${id}`, ({ headers: this.httpHeaders }))
  }

  getLogKnowledgeBylogkAnnId(logkAnnId: number): Observable<LogKnowledgeInterface> {
    return this.http.get<LogKnowledgeInterface>(`${this.authenticationService.path_url}/announcement_logKnowledge/${logkAnnId}`, ({ headers: this.httpHeaders }))
  }

  getKnowledgeReqById(id: number): Observable<KnowledgeRequirementInterface> {
    return this.http.get<KnowledgeRequirementInterface>(`${this.authenticationService.path_url}/announcement_knowledge/${id}`, ({ headers: this.httpHeaders }))
  }

  getLogPositionBylogpAnnId(logpAnnId: number): Observable<LogPositionInterface> {
    return this.http.get<LogPositionInterface>(`${this.authenticationService.path_url}/announcement_logPosition/${logpAnnId}`, ({ headers: this.httpHeaders }))
  }

  getPositionById(id: number): Observable<PositionDataInterface> {
    return this.http.get<PositionDataInterface>(`${this.authenticationService.path_url}/announcement_position_data/${id}`, ({ headers: this.httpHeaders }))
  }

  postAnnouncement(ann: AnouncementInterface): Observable<AnouncementInterface> {
    const annSend: AnouncementInterfacePost = {
      annEndDate: ann.annEndDate,
      annStartDate: ann.annStartDate,
      annStdAmount: ann.annStdAmount,
      annOrgId: ann.annOrgId,
      annItemReq: ann.annItemReq,
      annReward: ann.annReward,
      annWorkshift: ann.annWorkshift, 
      annAccId: ann.annAccId,
    };

    return this.http.post<AnouncementInterface>(`${this.authenticationService.path_url}/announcement`,annSend, ({ headers: this.httpHeaders }))
  }

  postLogPositionById(logPos: LogPositionInterface): Observable<LogPositionInterface> {
    const logPostSend: LogPositionInterfacePost = { 
      logpAnnId: logPos.logpAnnId,
      logpAnnPosId: logPos.logpAnnPosId
    };
    return this.http.post<LogPositionInterface>(`${this.authenticationService.path_url}/announcement_logPosition`, logPostSend,({ headers: this.httpHeaders }))
  }

  postLogKnowlegdeById(logKnow: LogKnowledgeInterface): Observable<LogKnowledgeInterface> {
    const logPostSend: LogKnowledgeInterfacePost = { 
      logkAnnId: logKnow.logkAnnId,
      logkAnnKrdId: logKnow.logkAnnKrdId
    };
    return this.http.post<LogKnowledgeInterface>(`${this.authenticationService.path_url}/announcement_logKnowledge`, logPostSend, ({ headers: this.httpHeaders }))
  }
}