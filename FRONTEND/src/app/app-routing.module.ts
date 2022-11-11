import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { DefaultComponent } from './pages/default/default.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthsessionGuard } from './guards/authsession.guard';
import { PoemsComponent } from './pages/poems/poems.component';
import { PoemComponent } from './pages/poem/poem.component';
import { NewPoemComponent } from './pages/new-poem/new-poem.component';
const routes: Routes = [
  { path:'', component: HomeComponent},
  { path:'home', component: HomeComponent},
  { path:'login', component: LoginComponent},
  { path:'registro', component: RegistroComponent},
  { path:'usuario/:id/:tipo_op', component: UsuarioComponent, canActivate:[AuthsessionGuard]},
  { path:'usuarios', component: UsuariosComponent, canActivate:[AuthsessionGuard]},
  { path:'poema/:id/:tipo_op', component: PoemComponent, canActivate:[AuthsessionGuard]},
  { path:'poemas', component: PoemsComponent, canActivate:[AuthsessionGuard]},
  { path:'nuevoPoema', component: NewPoemComponent, canActivate:[AuthsessionGuard]},
  { path: '**', component: DefaultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
