import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AtletasService } from './atletas.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  constructor(public service: AtletasService, private router: Router){}
  canActivate(){
    if(this.service.loggedIn == false) this.router.navigate(['/login']);
    return true;
  }
  
}
