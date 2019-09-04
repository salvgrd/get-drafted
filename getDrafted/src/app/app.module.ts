import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
    SponsorProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
