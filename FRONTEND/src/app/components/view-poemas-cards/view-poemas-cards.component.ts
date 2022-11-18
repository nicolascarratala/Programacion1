import { Component, OnInit } from '@angular/core';
import { PoemsService } from 'src/app/services/poems.service';


@Component({
  selector: 'app-view-poemas-cards',
  templateUrl: './view-poemas-cards.component.html',
  styleUrls: ['./view-poemas-cards.component.css']
})
export class ViewPoemasCardsComponent implements OnInit {

  constructor(private PoemsService: PoemsService) {
  }


  arrayPoemas:any
 

 
  ngOnInit(): void {
    this.PoemsService.getPoems().subscribe((data:any) =>{
      this.arrayPoemas = data.poems;
    })

}
}
