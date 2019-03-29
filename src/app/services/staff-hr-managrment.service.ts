import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

@Injectable()
export class HrmanagementService{
    private httpHeaders: HttpHeaders;
    private extractData(res: Response) {
        const body = res;
        return body || {};
    }
    constructor(
        private http: HttpClient, private authenticationService: AuthenticationService) {
        this.httpHeaders = this.authenticationService.gethttpHeadersRes;
    }
}
