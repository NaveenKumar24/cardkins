import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaTagsReportComponent } from './meta-tags-report.component';

describe('MetaTagsReportComponent', () => {
  let component: MetaTagsReportComponent;
  let fixture: ComponentFixture<MetaTagsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaTagsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaTagsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
