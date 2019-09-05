import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  filters: FormGroup;
  arrResults: any;
  arrAtletas: any;

  constructor( private atletasService: AtletasService, private router: Router) {
    this.filters = new FormGroup({
      usertype: new FormControl ('', []),
      nombre: new FormControl ('', []),
      pais: new FormControl ('', []),
      disci: new FormControl ('', []),
      sexo: new FormControl ('', [])
    })
  }

  ngOnInit() {
    this.atletasService.getAll()
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
           this.arrResults = response;
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  onSearch(){
    this.arrAtletas = [];
    if (this.filters.value.nombre != ""){
      let fname = this.filters.value.nombre;
      let atletas = this.arrResults;
      for (let atleta of atletas){
        if (atleta.nombre == fname) this.arrAtletas.push(atleta);
        else console.log(`v1: ${atleta.nombre} y v2: ${fname} no coinciden`)
      }
    }
  }

}
