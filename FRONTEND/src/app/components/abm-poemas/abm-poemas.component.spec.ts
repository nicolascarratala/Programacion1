import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmPoemasComponent } from './abm-poemas.component';

describe('AbmPoemasComponent', () => {
  let component: AbmPoemasComponent;
  let fixture: ComponentFixture<AbmPoemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmPoemasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmPoemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
