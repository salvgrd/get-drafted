import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioAtletaComponent } from './formulario-atleta/formulario-atleta.component';
import { LandingComponent } from './landing/landing.component';
import { FormularioSponsorComponent } from './formulario-sponsor/formulario-sponsor.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SponsorProfileComponent } from './sponsor-profile/sponsor-profile.component';
import { FiltroComponent } from './filtro/filtro.component';


const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'registro-atleta', component: FormularioAtletaComponent },
  { path: 'registro-sponsor', component: FormularioSponsorComponent},
  { path: 'atleta/:userid', component: UserProfileComponent},
  { path: 'sponsor/:userid', component: SponsorProfileComponent},
  { path: 'filtro', component: FiltroComponent}
  // { path: 'info', component: ContactComponent },
  // { path: 'pricing', component: PricingComponent, canActivate: [TestGuard] },
  // { path: 'libro/:idLibro', component: LibroComponent, children: [
  //     { path: 'reviews', component: ReviewsComponent },
  //     { path: 'related' , component: RelatedComponent }
  // ]},
  // { path: 'error', component: ErrorComponent},
  // { path: '**', redirectTo: 'info' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
