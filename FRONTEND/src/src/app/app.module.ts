import { NgModule ,NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FootComponent } from './components/foot/foot.component';
import { PagComponent } from './components/pag/pag.component';
import { ViewPoemasComponent } from './components/view-poemas/view-poemas.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AbmUsuarioComponent } from './components/abm-usuario/abm-usuario.component';
import { ViewUsuariosComponent } from './components/view-usuarios/view-usuarios.component';

//Services
import { UsersService } from './services/users.service';
import { PoemsService } from './services/poems.service';
import { ReviewsService } from './services/reviews.service';
import { LoginService } from './services/login.service';
import { AppbarComponent } from './components/appbar/appbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    FootComponent,
    PagComponent,
    ViewPoemasComponent,
    UsuarioComponent,
    UsuariosComponent,
    AbmUsuarioComponent,
    ViewUsuariosComponent,
    AppbarComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PoemsService,
              UsersService,
              LoginService,
              ReviewsService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
    
  ]
})

export class AppModule { }