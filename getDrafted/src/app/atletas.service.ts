import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { Atleta } from './models/atleta.model';

@Injectable({
  providedIn: 'root'
})
export class AtletasService {

  baseUrl: string;
  loggedAs: string
  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:3000/api/";
    this.loggedAs = this.readLoggedAs();
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
/*   create(values): Promise<any> {
    let httOptions = {
      headers: new HttpHeaders({
        'Authentication': localStorage.getItem('user-token')
      })
    }
    return this.http.post<any>(this.baseUrl, values, httOptions).toPromise();
  } */
}
//Mas o menos es esto... para revision segun proyecto
