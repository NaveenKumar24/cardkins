import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserseVisitingCardsMetaComponent } from './userse-visiting-cards-meta.component';

describe('UserseVisitingCardsMetaComponent', () => {
  let component: UserseVisitingCardsMetaComponent;
  let fixture: ComponentFixture<UserseVisitingCardsMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserseVisitingCardsMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserseVisitingCardsMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
