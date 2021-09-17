import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserseVisitingCardsComponent } from './userse-visiting-cards.component';

describe('UserseVisitingCardsComponent', () => {
  let component: UserseVisitingCardsComponent;
  let fixture: ComponentFixture<UserseVisitingCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserseVisitingCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserseVisitingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
