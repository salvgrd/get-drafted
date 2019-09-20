import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { Atleta } from './models/atleta.model';

@Injectable({
  providedIn: 'root'
})
export class AtletasService {

  baseUrl: string;
  loggedAs: string;
  loggedAsId: string;
  loggedIn: boolean;
  user: any;
  username: string;
  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:3000/api/";
    this.loggedAs = this.readLoggedAs();
    this.loggedIn = this.isLoggedIn();
    this.loggedAsId = localStorage.getItem('user-id')
  }
  // reloader
  reloadVars(){
    this.loggedAs = this.readLoggedAs();
    this.loggedIn = this.isLoggedIn();
    this.loggedAsId = localStorage.getItem('user-id')
    this.navbarGetter();
  }
  // Status de loggin
  isLoggedIn(){
    if (localStorage.length != 0) return true;
    return false;
  }
  navbarGetter(){
    if (!this.loggedIn) return
    if (this.loggedIn && this.loggedAs == 'atleta'){
      this.getAtletaById(this.loggedAsId)
      .then((response)=>{
        this.user = response
        this.username = this.user.nombre
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    if (this.loggedIn && this.loggedAs == 'sponsor'){
      this.getSponsorById(this.loggedAsId)
      .then((response)=>{
        this.user = response
        this.username = this.user.nombre
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
  readLoggedAs(){
    if (localStorage.getItem('token-atleta') != null) return 'atleta'; 
    if (localStorage.getItem('token-sponsor') != null) return 'sponsor';
    return 'out';
  }
  setHeaders(){
    return {
      headers: new HttpHeaders(environment.auth_key)
    }
  }
  // peticiones a backend
  getAllAtletas() {
    let httpOptions = this.setHeaders()
    let response = this.http.get(`${this.baseUrl}atletas?format=json`, httpOptions).toPromise();
    return response;
  }
  getAllSponsors() {
    let httpOptions = this.setHeaders()
    let response = this.http.get(`${this.baseUrl}empresas?format=json`, httpOptions).toPromise();
    return response;
  }

  getAtletaById(pId) {
    let httpOptions = this.setHeaders()
    let response = this.http.get(`${this.baseUrl}atletas/${pId}?format=json`, httpOptions).toPromise();
    return response;
  }

  getSponsorById(pId) {
    let httpOptions = this.setHeaders()
    let response = this.http.get(`${this.baseUrl}empresas/${pId}?format=json`, httpOptions).toPromise();
    return response;
  }

  registrarAtleta(pForm) {
    let httpOptions = this.setHeaders()
    let response = this.http.post(`${this.baseUrl}atletas/register?format=json`, pForm, httpOptions).toPromise();
    return response;
  }
  registrarSponsor(pForm) {
    let httpOptions = this.setHeaders()
    let response = this.http.post(`${this.baseUrl}empresas/register?format=json`, pForm, httpOptions).toPromise();
    return response;
  }
  loginAtleta(pForm){
    let httpOptions = this.setHeaders()
    let response = this.http.post(`${this.baseUrl}atletas/login?format=json`, pForm, httpOptions).toPromise();
    return response;
  }
  loginSponsor(pForm){
    let httpOptions = this.setHeaders()
    let response = this.http.post(`${this.baseUrl}empresas/login?format=json`, pForm, httpOptions).toPromise();
    return response;
  }
  ////////////////////////////////////////////////////////////////REVISAR LLAMADA CON BACK
  updateAtleta(pForm) {
    pForm.userId = localStorage.getItem('user-id');  
    let httpOptions = this.setHeaders()
    let response = this.http.post(`${this.baseUrl}atletas/update?format=json`, pForm, httpOptions).toPromise();
    return response;
    }
  updateSponsor(pForm) {
    pForm.userId = localStorage.getItem('user-id');  
    let httpOptions = this.setHeaders()
    let response = this.http.post(`${this.baseUrl}empresas/update?format=json`, pForm, httpOptions).toPromise();
    return response;
    }
}
