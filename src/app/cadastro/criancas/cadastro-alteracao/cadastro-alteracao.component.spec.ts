import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAlteracaoComponent } from './cadastro-alteracao.component';

describe('CadastroAlteracaoComponent', () => {
  let component: CadastroAlteracaoComponent;
  let fixture: ComponentFixture<CadastroAlteracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroAlteracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
