import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoluntariosAlteracaoComponent } from './voluntarios-alteracao/voluntarios-alteracao.component';
import { VoluntariosExclusaoComponent } from './voluntarios-exclusao/voluntarios-exclusao.component';
import { VoluntariosImprimeComponent } from './voluntarios-imprime/voluntarios-imprime.component';
import { VoluntariosInclusaoComponent } from './voluntarios-inclusao/voluntarios-inclusao.component';
import { VoluntariosVisualizacaoComponent } from './voluntarios-visualizacao/voluntarios-visualizacao.component';
import { VoluntariosComponent } from './voluntarios.component';




const routes: Routes = [
  { path: '', component: VoluntariosComponent },
  { path: 'inclusao', component: VoluntariosInclusaoComponent },
  { path: 'alteracao/:id', component: VoluntariosAlteracaoComponent },
  { path: 'exclusao/:id', component: VoluntariosExclusaoComponent },
  { path: 'visualizacao/:id', component: VoluntariosVisualizacaoComponent },
  { path: 'imprime/:id/:nomeVoluntario/:comunCongregacao/:funcao', component: VoluntariosImprimeComponent },
];
//const routes: Routes = [{ path: 'incluao', component: CadastroInclusaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VoluntariosRoutingModule { }
