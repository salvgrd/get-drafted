import { Component, OnInit } from '@angular/core';
//import { Atleta } from '../models/atleta.model';
import { AtletasService } from '../atletas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  arrAtletas: any;

  constructor( private atletasService: AtletasService, private router: Router) { }

  ngOnInit() {
    this.atletasService.getAll()
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
           this.arrAtletas = response;
           console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  } 

}
