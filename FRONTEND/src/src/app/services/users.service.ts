import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(token?: string) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + window.sessionStorage.getItem("token"))
    
    return this.httpClient.get("users", { headers: headers})
  }

  getUser(id: string) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + window.sessionStorage.getItem("token"))
    return this.httpClient.get("user/"+id, { headers: headers})
  }

  putUser( id: string, body:any ) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + window.sessionStorage.getItem("token"))
    return this.httpClient.put('user/' + id.toString(), body, {headers: headers})
  }

  delUser(id: string) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + window.sessionStorage.getItem("token"))
    return this.httpClient.delete('user/' + id.toString(), {headers: headers})
  }

/* 
  postUsers(token: string, body: { [key: string]: any }) {
    let heads = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Authorization', 'Bearer ' + token)
    return this.httpClient.post(this.url, body, {headers: heads})
  }
  
  putUsers(token: string, id: number, body: { [key: string]: any }) {
    let heads = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Authorization', 'Bearer ' + token)
    return this.httpClient.put(this.url + '/' + id.toString(), body, {headers: heads})
  }

  delUsers(token: string, id: number) {
    let heads = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Authorization', 'Bearer ' + token)
    return this.httpClient.delete(this.url + '/' + id.toString(), {headers: heads})
  } */
}

