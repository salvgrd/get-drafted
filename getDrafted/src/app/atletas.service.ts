import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Atleta } from './models/atleta.model';

@Injectable({
  providedIn: 'root'
})
export class AtletasService {

  baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:3000/api/";
  }

  getAllAtletas() {
    let response = this.http.get(`${this.baseUrl}atletas?format=json`).toPromise();
    return response;
  }
  getAllSponsors() {
    let response = this.http.get(`${this.baseUrl}empresas?format=json`).toPromise();
    return response;
  }

  getAtletaById(pId) {
    let response = this.http.get(`${this.baseUrl}atletas/${pId}?format=json`).toPromise();
    return response;
  }

  getSponsorById(pId) {
    let response = this.http.get(`${this.baseUrl}empresas/${pId}?format=json`).toPromise();
    return response;
  }

  registrarAtleta(pForm) {
    let response = this.http.post(`${this.baseUrl}atletas/register?format=json`, pForm).toPromise();
    return response;
  }
  registrarSponsor(pForm) {
    let response = this.http.post(`${this.baseUrl}empresas/register?format=json`, pForm).toPromise();
    return response;
  }
  loginAtleta(pForm){
    let response = this.http.post(`${this.baseUrl}atletas/login?format=json`, pForm).toPromise();
    return response;
  }
  loginSponsor(pForm){
    let response = this.http.post(`${this.baseUrl}empresas/login?format=json`, pForm).toPromise();
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
