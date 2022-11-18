import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems.service';
import Swal from 'sweetalert2'

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
     
    this.PoemsService.getPoem(this.poem_id).subscribe((data:any) =>{

      this.poem = data;
    })
 

  }

  

  delete(): void {
    this.PoemsService.delPoem(this.poem_id).subscribe((data:any) =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Poema eliminado',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/usuarios'])
    })
  }

}