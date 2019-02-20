import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { User } from '../_models/user';
import { Userappform } from '../_models/userappform';

@Injectable({
  providedIn: 'root'
})
export class AppFormService {

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) { }
  
}
