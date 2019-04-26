import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { StudentdataInterface } from '../_models/stu-data-interface';
import { StudentdataInterfaceQualifying } from '../_models/stu-data-qualifying-interface';

@Injectable({
    providedIn: 'root'
})
export class StudentDataService{

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

    errorHander(error: HttpErrorResponse) {
        // console.log("err status : ",error.status);
        return Observable.throw(error.message);
    }

    getstdBystdId(std_id: number): Observable<StudentdataInterface> {
        return this.http.get<StudentdataInterface>(`${this.authenticationService.path_url}/std_printout_ins001/${std_id}`,
            ({ headers: this.httpHeadersRes }));
    }

    // getstdBystdId2(std_id: number): Observable<StudentdataInterface[]>{
    //     console.log("test : ", 55555);
    //     console.log("url : ", `${this.authenticationService.path_url}/std_printout_ins001/${std_id}`);
    //     return this.http.get<StudentdataInterface[]>(`${this.authenticationService.path_url}/std_printout_ins001/${std_id}`,
    //         ({ headers: this.httpHeaders })).pipe(map(data => { console.log("req data => ",data);
    //             return data
    //         }), catchError(this.errorHander));
    // }

    getstddataBystdId(std_id: number): Observable<StudentdataInterface>{
        return this.http.get<StudentdataInterface>(`${this.authenticationService.path_url}/std_data/${std_id}`, 
            ({ headers: this.httpHeadersRes })).pipe(map(data => {
                 console.log("req data => ", data);
                return data
            }));
    }
    
    getStudentDataQualification(): Observable<StudentdataInterface[]>{
        return this.http.get<StudentdataInterface[]>(`${this.authenticationService.path_url}/all_std_data`, 
            ({ headers: this.httpHeadersRes })).pipe(map(data => {
                 console.log("req data => ", data);
                return data
            }));
    }
    putstddataBystdId(std_id: number,std: StudentdataInterface): Observable<StudentdataInterface> {
        // console.log("url : ", `${this.authenticationService.path_url}/std_addform/${std_id}`);
        // console.log("id : ", std_id);
        // console.log("std : ", std);
        // return null;
        return this.http.put<StudentdataInterface>(`${this.authenticationService.path_url}/std_addform/${std_id}`, std,
            ({ headers: this.httpHeadersRes }))
    }
    
}
