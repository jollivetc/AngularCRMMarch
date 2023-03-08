import { Injectable } from '@angular/core';
import { User } from './model/user';

const USER_STORAGE_KEY = 'angular.crm.user'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser?:User;

  constructor() {
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

  authentUser(login:string, password:string):User{
    this.currentUser= {
      id:1,
      login: login,
      lastname: 'Doe',
      firstname: 'John'
    }
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.currentUser));
    return this.currentUser;
  }
}
