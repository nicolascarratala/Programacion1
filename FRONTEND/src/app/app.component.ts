import { Component } from '@angular/core';
import { PoemsService } from './services/poems.service';
import { ReviewsService } from './services/reviews.service';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'src';       

constructor (
  private UsersService: UsersService,
  private ReviewsService: ReviewsService,
  private PoemsService: PoemsService
){} 

}