import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  email:any;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.email = this.getDecodedAccessToken(sessionStorage.getItem("token")).email;
  }


  getDecodedAccessToken(token:any): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  get isToken() {
    return sessionStorage.getItem("token") || undefined
  }
  get isAdmin() {
    const admin:any = sessionStorage.getItem("admin")
    if (admin == "true"){
      return true
    }else{
      return false
    }
  
  }

  cerrarSesion(){
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("admin")
    this.router.navigate(['/'])
  }

 
  

}
