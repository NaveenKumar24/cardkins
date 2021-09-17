import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWiseMetaTagsReportComponent } from './users-wise-meta-tags-report.component';

describe('UsersWiseMetaTagsReportComponent', () => {
  let component: UsersWiseMetaTagsReportComponent;
  let fixture: ComponentFixture<UsersWiseMetaTagsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersWiseMetaTagsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersWiseMetaTagsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
