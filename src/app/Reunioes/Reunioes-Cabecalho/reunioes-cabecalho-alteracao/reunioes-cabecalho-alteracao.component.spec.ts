import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunioesCabecalhoAlteracaoComponent } from './reunioes-cabecalho-alteracao.component';

describe('ReunioesCabecalhoAlteracaoComponent', () => {
  let component: ReunioesCabecalhoAlteracaoComponent;
  let fixture: ComponentFixture<ReunioesCabecalhoAlteracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunioesCabecalhoAlteracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReunioesCabecalhoAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
