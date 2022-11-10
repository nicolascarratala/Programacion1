import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  email:any;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem("email");
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
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("admin")
    sessionStorage.removeItem("id")
    this.router.navigate(['/'])
  }

 
  

}
