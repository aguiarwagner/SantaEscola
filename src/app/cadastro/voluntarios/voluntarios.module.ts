import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoChartModule, PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { VoluntariosComponent } from './voluntarios.component';
import { VoluntariosRoutingModule } from './voluntarios-routing.module';
import { VoluntariosInclusaoComponent } from './voluntarios-inclusao/voluntarios-inclusao.component';
import { VoluntariosAlteracaoComponent } from './voluntarios-alteracao/voluntarios-alteracao.component';
import { VoluntariosExclusaoComponent } from './voluntarios-exclusao/voluntarios-exclusao.component';
import { VoluntariosVisualizacaoComponent } from './voluntarios-visualizacao/voluntarios-visualizacao.component';
import { VoluntariosImprimeComponent } from './voluntarios-imprime/voluntarios-imprime.component';



@NgModule({
  declarations: [VoluntariosComponent, VoluntariosInclusaoComponent, VoluntariosAlteracaoComponent, VoluntariosExclusaoComponent, VoluntariosVisualizacaoComponent, VoluntariosImprimeComponent, VoluntariosImprimeComponent],
  imports: [
    CommonModule,
    VoluntariosRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    PoChartModule
  ],
  exports: [
    VoluntariosComponent
  ],
})
export class VoluntariosModule { }
