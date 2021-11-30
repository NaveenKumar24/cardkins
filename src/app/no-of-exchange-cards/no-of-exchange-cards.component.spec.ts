import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOfExchangeCardsComponent } from './no-of-exchange-cards.component';

describe('NoOfExchangeCardsComponent', () => {
  let component: NoOfExchangeCardsComponent;
  let fixture: ComponentFixture<NoOfExchangeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoOfExchangeCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoOfExchangeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
