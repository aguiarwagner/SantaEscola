import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroImprimeComponent } from './cadastro.imprime.component';

describe('CadastroImprimeComponent', () => {
  let component: CadastroImprimeComponent;
  let fixture: ComponentFixture<CadastroImprimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroImprimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroImprimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
