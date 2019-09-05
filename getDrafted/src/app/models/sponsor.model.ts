export class Sponsor{
    nombre_sponsor: string;
    nombre_responsable: string;
    bio: string;
    telefono: string;
    email: string;
    pais: string;
    disciplinas_patrocinio: string[];
    

    constructor(pNombre_sponsor:string, pNombre_responsable:string, pBio:string, pTelefono:string, pEmail:string, pPais:string, pDisciplinas_patrocinio:string[]) {
        this.nombre_sponsor = pNombre_sponsor;
        this.nombre_responsable = pNombre_responsable;
        this.bio = pBio;
        this.telefono = pTelefono;
        this.email = pEmail;
        this.pais = pPais;
        this.disciplinas_patrocinio = pDisciplinas_patrocinio;
    }
}