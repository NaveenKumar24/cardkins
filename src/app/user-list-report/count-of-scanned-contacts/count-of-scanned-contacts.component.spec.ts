import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountOfScannedContactsComponent } from './count-of-scanned-contacts.component';

describe('CountOfScannedContactsComponent', () => {
  let component: CountOfScannedContactsComponent;
  let fixture: ComponentFixture<CountOfScannedContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountOfScannedContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountOfScannedContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
