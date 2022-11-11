import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems.service';

@Component({
  selector: 'app-abm-poemas',
  templateUrl: './abm-poemas.component.html',
  styleUrls: ['./abm-poemas.component.css']
})
export class AbmPoemasComponent implements OnInit {

  @Input() poem_id!:string;
  @Input() tipoOperacion!:string;
  
  poem:any;

  constructor(
    private PoemsService: PoemsService,
    private router: Router
    ) { }

  ngOnInit(): void {
     
    this.PoemsService.getPoems().subscribe((data:any) =>{
      console.log('JSON data: ', data);
      this.poem = data.poems;
    })
 

  }

  admin(): void {
    if(!this.poem.admin){
      this.PoemsService.putPoem(this.poem_id, {"admin": 1}).subscribe((data:any) =>{
        alert("Usuario editado")
        this.router.navigate(['/usuarios'])
      })
    }else{
      this.PoemsService.putPoem(this.poem_id, {"admin": 0}).subscribe((data:any) =>{
        alert("Usuario editado")
        this.router.navigate(['/usuarios'])
      })
    }
  }

  delete(): void {
    this.PoemsService.delPoem(this.poem_id).subscribe((data:any) =>{
      alert("Usuario Eliminado")
      this.router.navigate(['/usuarios'])
    })
  }

}