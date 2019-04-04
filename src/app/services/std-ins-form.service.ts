import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { StudentdataInterface } from '../_models/stu-data-interface';

@Injectable()
export class StudentDataService{

    private httpHeaders: HttpHeaders;
    private extractData(res: Response) {
        const body = res;
        return body || {};
    }
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { 
        this.httpHeaders = this.authenticationService.gethttpHeadersRes;
    }

    get(): Observable<StudentdataInterface[]>{
        return this.http.get<StudentdataInterface[]>(`${this.authenticationService.path_url}/std_printout_ins001`,
            ({ headers: this.httpHeaders }))
    }

    getstddataBystdId(std_id: number): Observable<StudentdataInterface>{
        return this.http.get<StudentdataInterface>(`${this.authenticationService.path_url}/std_addform/${std_id}`, 
        ({ headers: this.httpHeaders }))
    }
    
}
