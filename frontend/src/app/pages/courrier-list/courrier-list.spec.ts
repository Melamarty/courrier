import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourrierList } from './courrier-list';

describe('CourrierList', () => {
  let component: CourrierList;
  let fixture: ComponentFixture<CourrierList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourrierList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourrierList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
