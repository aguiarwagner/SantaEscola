import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatoriosComponent } from './relatorios.component';


const routes: Routes = [
  { path: '', component: RelatoriosComponent },
];
//const routes: Routes = [{ path: 'incluao', component: CadastroInclusaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RelatoriosRoutingModule { }
