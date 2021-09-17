import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicSpecsReportComponent } from './devic-specs-report.component';

describe('DevicSpecsReportComponent', () => {
  let component: DevicSpecsReportComponent;
  let fixture: ComponentFixture<DevicSpecsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicSpecsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicSpecsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
