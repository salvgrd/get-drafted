import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioAtletaComponent } from './formulario-atleta/formulario-atleta.component';
import { LandingComponent } from './landing/landing.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'registro-atleta', component: FormularioAtletaComponent },
  { path: 'atleta/:userid', component: UserProfileComponent}
  // { path: 'info', component: ContactComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'pricing', component: PricingComponent, canActivate: [TestGuard] },
  // { path: 'empleado/:idEmpleado', component: EmpleadoComponent },
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
