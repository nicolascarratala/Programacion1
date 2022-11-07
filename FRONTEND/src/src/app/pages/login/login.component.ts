import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(
    private LoginService: LoginService,
    private router: Router) {
    
  }

 ngOnInit(): void {
   

}

pass = '';
email = '';

  onEmail(event: any) {
    this.email = event.target.value ;
  }
  onPass(event: any) {
    this.pass = event.target.value;
  }


  iniciarSession(){

   
    this.LoginService.postLogin({"email":this.email, "password":this.pass})
    .subscribe((data:any) =>{

      window.sessionStorage.setItem("token",data.access_token)
      window.sessionStorage.setItem("email",data.email)
      window.sessionStorage.setItem("id",data.id)
      this.router.navigate(['/'])
      
    })
  }

}
