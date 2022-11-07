import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { DefaultComponent } from './pages/default/default.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
const routes: Routes = [
  { path:'', component: HomeComponent},
  { path:'login', component: LoginComponent},
  { path:'registro', component: RegistroComponent},
  { path:'usuario/:id/:tipo_op', component: UsuarioComponent},
  { path:'usuarios', component: UsuariosComponent},
  { path: '**', component: DefaultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
