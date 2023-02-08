import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariosAlteracaoComponent } from './voluntarios-alteracao.component';

describe('VoluntariosAlteracaoComponent', () => {
  let component: VoluntariosAlteracaoComponent;
  let fixture: ComponentFixture<VoluntariosAlteracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntariosAlteracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntariosAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
