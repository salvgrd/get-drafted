import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Atleta } from './models/atleta.model';
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
