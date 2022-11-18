import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private LoginService: LoginService,
    private formBuider: FormBuilder,
    private router: Router) {
    
  }

 ngOnInit(): void {
   this.loginForm = this.formBuider.group({
    email: ['',Validators.required],
    password: ['',Validators.required],
   })

}

pass = '';
email = '';

  onEmail(event: any) {
    this.email = event.target.value ;
  }
  onPass(event: any) {
    this.pass = event.target.value;
  }


  iniciarSession( email:string, password:string){

   
    this.LoginService.postLogin({"email":email, "password":password})
    .subscribe((data:any) =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ya está logueado',
        showConfirmButton: false,
        timer: 1500
      })
      window.sessionStorage.setItem("token",data.access_token)
      window.sessionStorage.setItem("admin",data.admin)
      this.router.navigate(['/'])
      
    })
  }

  submit(){
     if(this.loginForm.valid){

       let email = this.loginForm.value.email;
       let password = this.loginForm.value.password;
                                 
       this.iniciarSession(email, password);
       }else{
        Swal.fire({
          title: 'Error!',
          text: 'Formulario invalido',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
    }
  }
}
