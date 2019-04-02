import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { StudentdataInterface } from '../_models/stu-data-interface';

@Injectable()
export class StudentDataInterface{
    private httpHeaders: HttpHeaders;
    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    // get(): Observable<StudentdataInterface[]>{
    //     return this.http.get<StudentdataInterface[]>(`${this.authenticationService.path_url}/std_printout_ins001`,
    //         ({ headers: this.httpHeaders }))
    // }

    // getBystdId(stdId: number) Observable<StudentdataInterface>{
    //     return this.http.get<StudentdataInterface>(`${this.authenticationService.path_url}/std_printout_ins001/${id}`, ({ headers: this.httpHeaders }))
    // }
    
}
