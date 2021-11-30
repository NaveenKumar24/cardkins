import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOfCardsExchangedandScannedComponent } from './no-of-cards-exchangedand-scanned.component';

describe('NoOfCardsExchangedandScannedComponent', () => {
  let component: NoOfCardsExchangedandScannedComponent;
  let fixture: ComponentFixture<NoOfCardsExchangedandScannedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoOfCardsExchangedandScannedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoOfCardsExchangedandScannedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
