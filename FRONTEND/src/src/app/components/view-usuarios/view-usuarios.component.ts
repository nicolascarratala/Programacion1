import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-view-usuarios',
  templateUrl: './view-usuarios.component.html',
  styleUrls: ['./view-usuarios.component.css']
})

export class ViewUsuariosComponent implements OnInit {
  
  arrayUsuarios:any;
  
  constructor(
    private router: Router,
    private UsersService: UsersService
  ) { }


  ngOnInit(): void {
    this.UsersService.getUsers().subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.arrayUsuarios = data.users;
    })
 

  }

  abmUser(id:any, alta:string) {
    this.router.navigateByUrl('/usuario/'+ id +'/' +alta);
  }

}
