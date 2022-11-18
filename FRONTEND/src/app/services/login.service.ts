import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'apilogin'

  constructor(
    private httpClient: HttpClient
  ) { }

  postLogin( body: any) {
    return this.httpClient.post(this.url, body)
  }
}
