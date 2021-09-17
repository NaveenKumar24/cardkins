import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountOfExchangedCardsComponent } from './count-of-exchanged-cards.component';

describe('CountOfExchangedCardsComponent', () => {
  let component: CountOfExchangedCardsComponent;
  let fixture: ComponentFixture<CountOfExchangedCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountOfExchangedCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountOfExchangedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
