import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EntradaComponent } from './entrada/entrada.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    {path: '', component: HomeComponent},
    //{path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: AppComponent },
    //{ path: 'entrada', component: EntradaComponent},
    //{ path: 'reunioes', component: ReunioesComponent},
    //{ path: 'cadastro', component: CadastroComponent},
    { path: 'cadastro', loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule)},
    { path: 'reunioes', loadChildren: () => import('./Reunioes/reunioes.module').then(m => m.ReunioesModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
