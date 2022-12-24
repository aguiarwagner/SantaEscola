import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoChartModule, PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReunioesRoutingModule } from './reunioes-routing.module';
import { ReunioesComponent } from './reunioes.component';
import { ReunioesCabecalhoInclusaoComponent } from './Reunioes-Cabecalho/reunioes-cabecalho-inclusao/reunioes-cabecalho-inclusao.component';
import { ReunioesCabecalhoExclusaoComponent } from './Reunioes-Cabecalho/reunioes-cabecalho-exclusao/reunioes-cabecalho-exclusao.component';
import { ReunioesCabecalhoAlteracaoComponent } from './Reunioes-Cabecalho/reunioes-cabecalho-alteracao/reunioes-cabecalho-alteracao.component';
import { ReunioesItensEntradaComponent } from './Reunioes-itens/reunioes-itens-entrada/reunioes-itens-entrada.component';
import { ReunioesItensSaidaComponent } from './Reunioes-itens/reunioes-itens-saida/reunioes-itens-saida.component';
import { ReunioesCabecalhoVisualizacaoComponent } from './Reunioes-Cabecalho/reunioes-cabecalho-visualizacao/reunioes-cabecalho-visualizacao.component';



@NgModule({
  declarations: [ReunioesComponent, ReunioesCabecalhoInclusaoComponent, ReunioesCabecalhoExclusaoComponent, ReunioesCabecalhoAlteracaoComponent, ReunioesItensEntradaComponent, ReunioesItensSaidaComponent, ReunioesCabecalhoVisualizacaoComponent],
  imports: [
    CommonModule,
    ReunioesRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    PoChartModule
  ],
  exports: [
    ReunioesComponent
  ],
})
export class ReunioesModule { }
