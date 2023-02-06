import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatoriosComponent } from './relatorios.component';
import { PoChartModule, PoModule } from '@po-ui/ng-components';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RelatoriosComponent],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    PoChartModule
  ],
  exports: [
    RelatoriosComponent
  ],
})

export class RelatoriosModule { }
