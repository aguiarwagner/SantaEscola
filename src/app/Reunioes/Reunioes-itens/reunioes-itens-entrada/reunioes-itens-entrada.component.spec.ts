import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunioesItensEntradaComponent } from './reunioes-itens-entrada.component';

describe('ReunioesItensEntradaComponent', () => {
  let component: ReunioesItensEntradaComponent;
  let fixture: ComponentFixture<ReunioesItensEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunioesItensEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReunioesItensEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
