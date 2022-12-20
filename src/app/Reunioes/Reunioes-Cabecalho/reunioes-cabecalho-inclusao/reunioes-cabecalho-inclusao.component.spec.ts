import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunioesCabecalhoInclusaoComponent } from './reunioes-cabecalho-inclusao.component';

describe('ReunioesCabecalhoInclusaoComponent', () => {
  let component: ReunioesCabecalhoInclusaoComponent;
  let fixture: ComponentFixture<ReunioesCabecalhoInclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunioesCabecalhoInclusaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReunioesCabecalhoInclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
