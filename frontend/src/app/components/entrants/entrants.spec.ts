import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entrants } from './entrants';

describe('Entrants', () => {
  let component: Entrants;
  let fixture: ComponentFixture<Entrants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entrants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Entrants);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
