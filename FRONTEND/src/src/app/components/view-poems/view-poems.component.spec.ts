import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoemsComponent } from './view-poems.component';

describe('ViewPoemsComponent', () => {
  let component: ViewPoemsComponent;
  let fixture: ComponentFixture<ViewPoemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPoemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPoemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
