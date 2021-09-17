import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventwisereportComponent } from './eventwisereport.component';

describe('EventwisereportComponent', () => {
  let component: EventwisereportComponent;
  let fixture: ComponentFixture<EventwisereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventwisereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventwisereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
