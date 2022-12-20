import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunioesCabecalhoVisualizacaoComponent } from './reunioes-cabecalho-visualizacao.component';

describe('ReunioesCabecalhoVisualizacaoComponent', () => {
  let component: ReunioesCabecalhoVisualizacaoComponent;
  let fixture: ComponentFixture<ReunioesCabecalhoVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunioesCabecalhoVisualizacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReunioesCabecalhoVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
