import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css']
})
export class AbmUsuarioComponent implements OnInit {
  @Input() user_id!:string;
  @Input() tipoOperacion!:string;
  
  user:any;

  constructor(
    private UsersService: UsersService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.UsersService.getUser(this.user_id).subscribe((data:any) =>{
     
      this.user = data;
    })
 

  }

  admin(): void {
    if(!this.user.admin){
      this.UsersService.putUser(this.user_id, {"admin": 1}).subscribe((data:any) =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario editado',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/usuarios'])
      })
    }else{
      this.UsersService.putUser(this.user_id, {"admin": 0}).subscribe((data:any) =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario editado',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/usuarios'])
      })
    }
  }

  delete(): void {
    this.UsersService.delUser(this.user_id).subscribe((data:any) =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario eliminado',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/usuarios'])
    })
  }

}