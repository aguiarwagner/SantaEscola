
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoChartModule } from '@po-ui/ng-components';
import { EntradaRoutingModule } from './entrada-routing.module';
import { EntradaComponent } from './entrada.component';





@NgModule({
  declarations: [EntradaComponent],
  imports: [
    CommonModule,
    EntradaRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    PoChartModule
  ],
})
export class EntradaModule { }
