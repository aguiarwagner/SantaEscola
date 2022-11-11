import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroAlteracaoComponent } from './cadastro-alteracao/cadastro-alteracao.component';
import { CadastroExclusaoComponent } from './cadastro-exclusao/cadastro-exclusao.component';
import { CadastroInclusaoComponent } from './cadastro-inclusao/cadastro-inclusao.component';
import { CadastroVisualizacaoComponent } from './cadastro-visualizacao/cadastro-visualizacao.component';
import { CadastroComponent } from './cadastro.component';




const routes: Routes = [
  { path: '', component: CadastroComponent },
  { path: 'inclusao', component: CadastroInclusaoComponent },
  { path: 'alteracao', component: CadastroAlteracaoComponent },
  { path: 'exclusao', component: CadastroExclusaoComponent },
  { path: 'visualizacao', component: CadastroVisualizacaoComponent },
];
//const routes: Routes = [{ path: 'incluao', component: CadastroInclusaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
