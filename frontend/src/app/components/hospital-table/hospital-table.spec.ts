import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalTable } from './hospital-table';

describe('HospitalTable', () => {
  let component: HospitalTable;
  let fixture: ComponentFixture<HospitalTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
