import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EntradaComponent } from './entrada/entrada.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    //{path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: AppComponent },
    //{ path: 'entrada', component: EntradaComponent},
    //{ path: 'reunioes', component: ReunioesComponent},
    //{ path: 'cadastro', component: CadastroComponent},
    { path: 'cadastro', loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule), canActivate: [AuthGuard]},
    { path: 'reunioes', loadChildren: () => import('./Reunioes/reunioes.module').then(m => m.ReunioesModule), canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
