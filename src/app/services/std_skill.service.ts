import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { StudentSkillInterface } from '../_models/std_skill-interface';

@Injectable({
    providedIn: 'root'
})
export class StudentSkillSerivce{
    private httpHeaders: HttpHeaders;
    private httpHeadersRes: HttpHeaders;
    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
        // this.httpHeaders = this.authenticationService.gethttpHeadersRes;
        this.httpHeadersRes = this.authenticationService.gethttpHeadersRes;
        this.httpHeaders = this.authenticationService.gethttpHeaders;
    }

    getstdskillBystdId(std_id: number): Observable<StudentSkillInterface>{
        return this.http.get<StudentSkillInterface>(`${this.authenticationService.path_url}/std_skill/${std_id}`,
            ({ headers: this.httpHeaders }))
    }
}