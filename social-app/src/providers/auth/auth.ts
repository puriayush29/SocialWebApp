import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const BASEURL = "http://localhost:3000/api/chatapp"
@Injectable()
export class AuthProvider {

  constructor(private http: HttpClient) {

  }

  RegisterUser(email, username, password): Observable<any> {
    return this.http.post(`${BASEURL}/register`, {
      username, email, password
    })
  }

  LoginUser(body): Observable<any> {
    return this.http.post(`${BASEURL}/login`, body)
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${BASEURL}/users`);
  }
}
