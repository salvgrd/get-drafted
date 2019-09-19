import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: any;
  username: string;
  constructor(public service: AtletasService, private router: Router) {
  }
  ngOnInit() {
    if (!this.service.loggedIn) return
    if (this.service.loggedIn && this.service.loggedAs == 'atleta'){
      this.service.getAtletaById(this.service.loggedAsId)
      .then((response)=>{
        this.usuario = response
        this.username = this.usuario.nombre
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    if (this.service.loggedIn && this.service.loggedAs == 'sponsor'){
      this.service.getSponsorById(this.service.loggedAsId)
      .then((response)=>{
        this.usuario = response
        this.username = this.usuario.nombre
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/landing']);
  }
}
