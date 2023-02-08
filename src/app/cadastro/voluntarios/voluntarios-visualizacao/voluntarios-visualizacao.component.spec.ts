import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariosVisualizacaoComponent } from './voluntarios-visualizacao.component';

describe('VoluntariosVisualizacaoComponent', () => {
  let component: VoluntariosVisualizacaoComponent;
  let fixture: ComponentFixture<VoluntariosVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntariosVisualizacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntariosVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
