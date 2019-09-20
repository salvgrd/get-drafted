import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtletasService } from '../atletas.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  usuario: any;
  username: string;
  constructor( private route: ActivatedRoute, private router: Router, public service: AtletasService ) { }

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
  onAnchorClick ( ) {
    this.route.fragment.subscribe ( f => {
      const element = document.querySelector( "#" + f )
      if(element)element.scrollIntoView({block: "start", behavior: "smooth"})
    });
  }

}
