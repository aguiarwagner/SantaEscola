import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroInclusaoComponent } from './cadastro-inclusao.component';

describe('CadastroInclusaoComponent', () => {
  let component: CadastroInclusaoComponent;
  let fixture: ComponentFixture<CadastroInclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroInclusaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroInclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
