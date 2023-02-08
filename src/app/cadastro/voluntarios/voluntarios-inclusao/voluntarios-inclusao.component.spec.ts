import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariosInclusaoComponent } from './voluntarios-inclusao.component';

describe('VoluntariosInclusaoComponent', () => {
  let component: VoluntariosInclusaoComponent;
  let fixture: ComponentFixture<VoluntariosInclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntariosInclusaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntariosInclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
