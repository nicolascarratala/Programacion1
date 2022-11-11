
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PoemsService {
  

  constructor(
    private httpClient: HttpClient
  ) { }

  getPoems() {
   let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + window.sessionStorage.getItem("token"))
    
    return this.httpClient.get("apipoems", { headers: headers})
  }

  getPoem(id: number) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + window.sessionStorage.getItem("token"))
    
    return this.httpClient.get("apipoem/"+id, { headers: headers})
  }

  postPoem( body: any ) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + window.sessionStorage.getItem("token"))

    return this.httpClient.post("apipoems",body, { headers: headers})
  }

  putPoem(id: string, body: any ) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + window.sessionStorage.getItem("token"))

    return this.httpClient.put('apipoem/' + id, body, {headers: headers})
  }

  delPoem( id:string) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + window.sessionStorage.getItem("token"))

    return this.httpClient.delete('apipoem/' + id, {headers: headers})
  }

}