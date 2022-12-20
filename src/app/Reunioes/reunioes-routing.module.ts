import { ReunioesComponent } from './reunioes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReunioesCabecalhoInclusaoComponent } from './Reunioes-Cabecalho/reunioes-cabecalho-inclusao/reunioes-cabecalho-inclusao.component';
import { ReunioesItensEntradaComponent } from './Reunioes-itens/reunioes-itens-entrada/reunioes-itens-entrada.component';
import { ReunioesItensSaidaComponent } from './Reunioes-itens/reunioes-itens-saida/reunioes-itens-saida.component';
import { ReunioesCabecalhoVisualizacaoComponent } from './Reunioes-Cabecalho/reunioes-cabecalho-visualizacao/reunioes-cabecalho-visualizacao.component';
import { ReunioesCabecalhoAlteracaoComponent } from './Reunioes-Cabecalho/reunioes-cabecalho-alteracao/reunioes-cabecalho-alteracao.component';
import { ReunioesCabecalhoExclusaoComponent } from './Reunioes-Cabecalho/reunioes-cabecalho-exclusao/reunioes-cabecalho-exclusao.component';



const routes: Routes = [
  { path: '', component: ReunioesComponent },
  { path: 'inclusaoreuniao', component: ReunioesCabecalhoInclusaoComponent },
  { path: 'entradareuniao/:id', component: ReunioesItensEntradaComponent },
  { path: 'saidareuniao/:id', component: ReunioesItensSaidaComponent },
  { path: 'visualizareuniao/:id', component: ReunioesCabecalhoVisualizacaoComponent },
  { path: 'alteracaoreuniao/:id', component: ReunioesCabecalhoAlteracaoComponent },
  { path: 'exclusaoreuniao/:id', component: ReunioesCabecalhoExclusaoComponent },
  //{ path: 'alteracao/:id', component: CadastroAlteracaoComponent },
  //{ path: 'exclusao/:id', component: CadastroExclusaoComponent },
  //{ path: 'visualizacao/:id', component: CadastroVisualizacaoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReunioesRoutingModule { }
