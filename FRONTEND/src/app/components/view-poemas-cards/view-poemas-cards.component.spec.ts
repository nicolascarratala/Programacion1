import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoemasCardsComponent } from './view-poemas-cards.component';

describe('ViewPoemasCardsComponent', () => {
  let component: ViewPoemasCardsComponent;
  let fixture: ComponentFixture<ViewPoemasCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPoemasCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPoemasCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
