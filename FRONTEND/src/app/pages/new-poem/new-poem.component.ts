import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoemsService } from 'src/app/services/poems.service';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.css']
})
export class NewPoemComponent implements OnInit {
  poemForm!: FormGroup;

  constructor(
    private PoemsService: PoemsService,
    private formBuider: FormBuilder,
    private router: Router) {
    
  }

 ngOnInit(): void {
   this.poemForm = this.formBuider.group({
    title: ['',Validators.required],
    content: ['',Validators.required],

   })

  }

  newPoem( body:any ){
    this.PoemsService.postPoem({"title":body.title, "content":body.content, "userID":body.userID})
    .subscribe((data:any) =>{
      console.log(data)
      this.router.navigate(['/', 'home'])
    })

  }

  submit(){
    
     if(this.poemForm.valid){
       let title = this.poemForm.value.title;
       let content = this.poemForm.value.content;
   
                                 
       this.newPoem({"title": title, "content" : content, "userID": sessionStorage.getItem("id")});
       }else{
        alert("Formulario invalido")
    }
  }
}
