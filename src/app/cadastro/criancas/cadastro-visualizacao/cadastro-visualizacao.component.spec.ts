import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVisualizacaoComponent } from './cadastro-visualizacao.component';

describe('CadastroVisualizacaoComponent', () => {
  let component: CadastroVisualizacaoComponent;
  let fixture: ComponentFixture<CadastroVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroVisualizacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
