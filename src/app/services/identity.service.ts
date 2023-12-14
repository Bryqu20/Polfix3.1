import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
// import { Observable } from 'rxjs';
// import { APIResponse, UserProfile } from '../modules';
import { environments as env } from '../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(private http: HttpClient) {}
  login(
    userName: string | any,
    password: string | any
  ){

    return this.http.post(`${env.loginApiURI}`,{UserName: userName, Password: password})
  }

  register(userName: string | any, password: string | any){
    return this.http.post(`${env.userRegistration}`,{Username: userName, Password: password})
  }
}
