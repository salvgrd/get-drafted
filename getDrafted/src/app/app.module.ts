import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormularioAtletaComponent } from './formulario-atleta/formulario-atleta.component';
import { LandingComponent } from './landing/landing.component';
import { FormularioSponsorComponent } from './formulario-sponsor/formulario-sponsor.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SponsorProfileComponent } from './sponsor-profile/sponsor-profile.component';
import { FiltroComponent } from './filtro/filtro.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginEmpresasComponent } from './login-empresas/login-empresas.component';
import { MatStepperModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    FormularioAtletaComponent,
    LandingComponent,
    FormularioSponsorComponent,
    UserProfileComponent,
    SponsorProfileComponent,
    FiltroComponent,
    LoginFormComponent,
    LoginEmpresasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
