import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwisereportComponent } from './userwisereport.component';

describe('UserwisereportComponent', () => {
  let component: UserwisereportComponent;
  let fixture: ComponentFixture<UserwisereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserwisereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserwisereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
