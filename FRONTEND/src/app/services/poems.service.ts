
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
   
    return this.httpClient.get("apipoems")
  }

  getPoem(id: string) {
   
    return this.httpClient.get("apipoem/"+id)
  }

  postPoem( body: any ) {
 

    return this.httpClient.post("apipoems",body)
  }

  putPoem(id: string, body: any ) {

    return this.httpClient.put('apipoem/' + id, body)
  }

  delPoem( id:string) {
 
    return this.httpClient.delete('apipoem/' + id)
  }

}