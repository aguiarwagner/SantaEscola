import { NgModule } from '@angular/core';
import { CadastroComponent } from './cadastro.component';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { CommonModule } from '@angular/common';
import { PoChartModule, PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CadastroInclusaoComponent } from './cadastro-inclusao/cadastro-inclusao.component';
import { CadastroAlteracaoComponent } from './cadastro-alteracao/cadastro-alteracao.component';
import { CadastroExclusaoComponent } from './cadastro-exclusao/cadastro-exclusao.component';
import { CadastroVisualizacaoComponent } from './cadastro-visualizacao/cadastro-visualizacao.component';
import { CadastroImprimeComponent } from './cadastro.imprime/cadastro.imprime.component';



@NgModule({
  declarations: [CadastroComponent, CadastroInclusaoComponent, CadastroAlteracaoComponent, CadastroExclusaoComponent, CadastroVisualizacaoComponent, CadastroImprimeComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    PoChartModule
  ],
  exports: [
    CadastroComponent
  ],
})
export class CadastroModule { }
