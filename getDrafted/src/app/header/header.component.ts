import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public service: AtletasService, private router: Router) {}
  ngOnInit() {
    this.service.navbarGetter()
  }
  logOut(){
    localStorage.clear();
    this.service.reloadVars();
    this.router.navigate(['/landing']);
  }
}
