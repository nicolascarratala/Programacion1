import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPutUser } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers() {
   
    
    return this.httpClient.get("apiusers")
  }

  getUser(id: string) {
   
    return this.httpClient.get("apiuser/"+id)
  }
  putUser( id: string, body:IPutUser ) {
    
    return this.httpClient.put('apiuser/' + id.toString(), body)
  }

  delUser(id: string) {

    return this.httpClient.delete('apiuser/' + id.toString())
  }

  postUser( body: any ) {
  
    return this.httpClient.post("apiregister", body)
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

