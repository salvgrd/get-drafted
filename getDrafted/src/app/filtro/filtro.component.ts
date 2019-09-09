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
  show: boolean;
  filtersAtletas: FormGroup;
  filtersSponsor: FormGroup;
  arrResults: any;
  arrAtletas: any;

  constructor( private atletasService: AtletasService, private router: Router) {
    this.filtersAtletas = new FormGroup({
      nombre: new FormControl ('', []),
      pais: new FormControl ('', []),
      disci: new FormControl ('', []),
      sexo: new FormControl ('', [])
    })
    this.filtersSponsor = new FormGroup({
      nombre: new FormControl ('', []),
      pais: new FormControl ('', []),
      disci: new FormControl ('', [])
    })
    this.show = true;
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
  // Hacer estas funciones escalables.
  // Hacer que al menos un campo sea rellenado
  // funciones formulario de atletas
  filterByName(){
    let fname = this.filtersAtletas.value.nombre;
    let atletas = this.arrResults;
    let filteredByName = atletas.filter( atleta => atleta.nombre == fname )
    return filteredByName;
  }
  filterByLocation(arr){
    let pArr = arr;
    let fubicacion = this.filtersAtletas.value.pais;
    let filteredByLocation = pArr.filter(atleta => atleta.ubicacion == fubicacion);
    return filteredByLocation;
  }
  filterBySport(arr){
    let pArr = arr;
    let fdisci = this.filtersAtletas.value.disci;
    let filteredBySport = pArr.filter(atleta => atleta.disciplina == fdisci);
    console.log(pArr);
    return filteredBySport;
  }
  filterByGender(arr){
    let pArr = arr;
    let fsexo = this.filtersAtletas.value.sexo;
    let filteredByGender = pArr.filter(atleta => atleta.sexo == fsexo);
    return filteredByGender;
  }
  onSearch(){
    this.arrAtletas = this.arrResults;
    if (this.filtersAtletas.value.nombre != "") {
      let fNombre = this.filterByName()
      this.arrAtletas = fNombre;
    };
    if (this.filtersAtletas.value.pais != "") {
      let filtered = this.filterByLocation(this.arrAtletas)
      this.arrAtletas = filtered;
    };
    if (this.filtersAtletas.value.disci != "") {
      let filtered = this.filterBySport(this.arrAtletas)
      this.arrAtletas = filtered;
    }
    if (this.filtersAtletas.value.sexo != "") {
      let filtered = this.filterByGender(this.arrAtletas)
      this.arrAtletas = filtered;
    }
  }
  //funciones del formulario de sponsors.

}
