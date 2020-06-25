import { Injectable } from '@angular/core';

const TOKEN_KEY='auth-token';
const USER_KEY='auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public getToken(){
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveToken(token: string){
   sessionStorage.removeItem(TOKEN_KEY);
   sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getUser(){
    return sessionStorage.getItem(USER_KEY);
  }

  public saveUser(user){
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  public isLoggedIn(){
    return !!this.getUser();
  }

  signOut(){
    sessionStorage.clear();
  }
}
