import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunioesCabecalhoExclusaoComponent } from './reunioes-cabecalho-exclusao.component';

describe('ReunioesCabecalhoExclusaoComponent', () => {
  let component: ReunioesCabecalhoExclusaoComponent;
  let fixture: ComponentFixture<ReunioesCabecalhoExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunioesCabecalhoExclusaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReunioesCabecalhoExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
