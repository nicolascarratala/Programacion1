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
    points: ['',Validators.required],

   })

  }

  newPoem( body:any ){
    this.PoemsService.postPoem(body)
    .subscribe((data:any) =>{
      this.router.navigate(['/', 'home'])
    })

  }

  getDecodedAccessToken(token:any): any {
    try {
      console.log(jwt_decode(token))
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  submit(){
    
     if(this.poemForm.valid){
       let title :string = this.poemForm.value.title;
       let content :string = this.poemForm.value.content;
       let points : number = this.poemForm.value.points;
       
       console.log(this.getDecodedAccessToken(sessionStorage.getItem("token")))
                                 
       this.newPoem({"title": title, "content" : content, "points": Number(points), "userID": 1});
       }else{
        alert("Formulario invalido")
    }
  }
}
function jwt_decode(token: any): any {
  throw new Error('Function not implemented.');
}

