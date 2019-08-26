import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { BodyComponent } from './body/body.component';
=======
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
>>>>>>> ea7dc6191cb627172a29ba78c318bb142db53ded

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    BodyComponent
=======
    HeaderComponent,
    HeroComponent
>>>>>>> ea7dc6191cb627172a29ba78c318bb142db53ded
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
