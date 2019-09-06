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
  // Obtener de estas funciones un dato, y utilizar el conjunto de datos para hacer un filtrado complejo.
  filterByName(){
    let fname = this.filters.value.nombre;
    let atletas = this.arrResults;
    let filteredByName = atletas.filter( atleta => atleta.nombre == fname )
    return filteredByName;
    // for (let atleta of atletas){
    //   if (atleta.nombre == fname) return atleta.nombre this.arrAtletas.push(atleta);
    //   else return fname
    // }
  }
  filterByLocation(arr){
    let pArr = arr;
    if(pArr.length == 0) pArr = this.arrResults;
    let fubicacion = this.filters.value.pais;
    let filteredByLocation = pArr.filter(atleta => atleta.ubicacion == fubicacion);
    return filteredByLocation;
  }
  filterBySport(arr){
    let pArr = arr;
    if(pArr.length == 0) pArr = this.arrResults;
    let fdisci = this.filters.value.disci;
    let filteredBySport = pArr.filter(atleta => atleta.disciplina == fdisci);
    console.log(pArr);
    return filteredBySport;
  }
  filterByGender(arr){
    let pArr = arr;
    if(pArr.length == 0) pArr = this.arrResults;
    let fsexo = this.filters.value.sexo;
    let filteredByGender = pArr.filter(atleta => atleta.sexo == fsexo);
    return filteredByGender;
  }
  onSearch(){
    this.arrAtletas = [];
    if (this.filters.value.nombre != "") {
      let fNombre = this.filterByName()
      this.arrAtletas = fNombre;
    };
    if (this.filters.value.pais != "") {
      let filtered = this.filterByLocation(this.arrAtletas)
      this.arrAtletas = filtered;
    };
    if (this.filters.value.disci != "") {
      let filtered = this.filterBySport(this.arrAtletas)
      this.arrAtletas = filtered;
    }
    if (this.filters.value.sexo != "") {
      let filtered = this.filterByGender(this.arrAtletas)
      this.arrAtletas = filtered;
    }
  }

}
