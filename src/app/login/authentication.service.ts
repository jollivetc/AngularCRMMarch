import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './model/user';

const USER_STORAGE_KEY = 'angular.crm.user';
const TOKEN_STORAGE_KEY = 'angular.crm.token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser?:User;
  private token?: string;

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem(USER_STORAGE_KEY)){
      this.currentUser= JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY)!);
    }
  }

  get authenticated():boolean{
    return !!this.currentUser;
  }

  disconnect():void{
    sessionStorage.clear()
  }

  authentUser(login:string, password:string):Observable<User>{
    return this.http.post<AuthentResponse>('/api/auth/login', {email:login, password:password})
        .pipe(
          map((authentResp:AuthentResponse)=>{
            this.currentUser = authentResp.user;
            this.token = authentResp.token;
            sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.currentUser));
            sessionStorage.setItem(TOKEN_STORAGE_KEY, this.token);
            return this.currentUser;
          })
        );
  }
}

interface AuthentResponse{
  user:User,
  token:string
}
