import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroExclusaoComponent } from './cadastro-exclusao.component';

describe('CadastroExclusaoComponent', () => {
  let component: CadastroExclusaoComponent;
  let fixture: ComponentFixture<CadastroExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroExclusaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
