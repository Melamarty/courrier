import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sortants } from './sortants';

describe('Sortants', () => {
  let component: Sortants;
  let fixture: ComponentFixture<Sortants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sortants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sortants);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
