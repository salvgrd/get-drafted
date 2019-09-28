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
  show: string;
  filtersAtletas: FormGroup;
  filtersSponsor: FormGroup;
  arrResultsAtletas: any;
  arrResultsSponsors: any;
  arrUserShowList: any;

  constructor( private atletasService: AtletasService, private router: Router) {
    this.arrUserShowList = [];
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
    this.show = 'atleta';
  }

  ngOnInit() {
    this.atletasService.getAllAtletas()
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
           this.arrResultsAtletas = response;
        }
      })
      .catch((err) => {
        console.log(err);
      })
      this.atletasService.getAllSponsors()
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
           this.arrResultsSponsors = response;
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  clearerShowAtleta(){
    if (this.show != 'atleta'){
      this.arrUserShowList = []
      this.show = 'atleta'
    }
  }
  clearerShowSponsor(){
    if (this.show != 'sponsor'){
      this.arrUserShowList = []
      this.show = 'sponsor'
    }
  }
  // Hacer estas funciones escalables.
  // Hacer que al menos un campo sea rellenado
  // funciones formulario de atletas
  filterByName(){
    let fname = this.filtersAtletas.value.nombre;
    let atletas = this.arrResultsAtletas;
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
    return filteredBySport;
  }
  filterByGender(arr){
    let pArr = arr;
    let fsexo = this.filtersAtletas.value.sexo;
    let filteredByGender = pArr.filter(atleta => atleta.sexo == fsexo);
    return filteredByGender;
  }
  onSearch(){
    this.arrUserShowList = this.arrResultsAtletas;
    if (this.filtersAtletas.value.nombre != "") {
      let fNombre = this.filterByName()
      this.arrUserShowList = fNombre;
    };
    if (this.filtersAtletas.value.pais != "") {
      let filtered = this.filterByLocation(this.arrUserShowList)
      this.arrUserShowList = filtered;
    };
    if (this.filtersAtletas.value.disci != "") {
      let filtered = this.filterBySport(this.arrUserShowList)
      this.arrUserShowList = filtered;
    }
    if (this.filtersAtletas.value.sexo != "") {
      let filtered = this.filterByGender(this.arrUserShowList)
      this.arrUserShowList = filtered;
    }
  }
  //funciones del formulario de sponsors.
  sponsorFilterByName(){
    let fname = this.filtersSponsor.value.nombre;
    let sponsors = this.arrResultsSponsors;
    let filteredByName = sponsors.filter( sponsor => sponsor.nombre == fname )
    return filteredByName;
  }
  sponsorFilterByLocation(arr){
    let pArr = arr;
    let fubicacion = this.filtersSponsor.value.pais;
    let filteredByLocation = pArr.filter(sponsor => sponsor.ubicacion == fubicacion);
    return filteredByLocation;
  }
  sponsorFilterBySport(arr){
    let pArr = arr;
    let fdisci = this.filtersSponsor.value.disci;
    let filteredBySport = pArr.filter(sponsor => sponsor.disciplinas_patrocinio == fdisci);
    return filteredBySport;
  }
  sponsorOnSearch(){
    this.arrUserShowList = this.arrResultsSponsors;
    if (this.filtersSponsor.value.nombre != "") {
      let fNombre = this.sponsorFilterByName()
      this.arrUserShowList = fNombre;
    };
    if (this.filtersSponsor.value.pais != "") {
      let filtered = this.sponsorFilterByLocation(this.arrUserShowList)
      this.arrUserShowList = filtered;
    };
    if (this.filtersSponsor.value.disci != "") {
      let filtered = this.sponsorFilterBySport(this.arrUserShowList)
      this.arrUserShowList = filtered;
    }
  }
}
