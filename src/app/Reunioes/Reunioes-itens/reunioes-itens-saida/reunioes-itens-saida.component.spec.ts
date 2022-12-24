import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunioesItensSaidaComponent } from './reunioes-itens-saida.component';

describe('ReunioesItensSaidaComponent', () => {
  let component: ReunioesItensSaidaComponent;
  let fixture: ComponentFixture<ReunioesItensSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunioesItensSaidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReunioesItensSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
