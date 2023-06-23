import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariosImprimeComponent } from './voluntarios-imprime.component';

describe('VoluntariosImprimeComponent', () => {
  let component: VoluntariosImprimeComponent;
  let fixture: ComponentFixture<VoluntariosImprimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntariosImprimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntariosImprimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
