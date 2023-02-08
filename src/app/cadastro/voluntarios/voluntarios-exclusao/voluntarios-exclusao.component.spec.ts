import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntariosExclusaoComponent } from './voluntarios-exclusao.component';

describe('VoluntariosExclusaoComponent', () => {
  let component: VoluntariosExclusaoComponent;
  let fixture: ComponentFixture<VoluntariosExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntariosExclusaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntariosExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
