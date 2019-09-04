export class Atleta{
    nombre: string;
    apellidos: string;
    edad:number;
    sexo: string;
    pais: string;
    telefono: string;
    email: string;
    disciplina: string;
    experiencia: string;
    marcas_personales: string[];
    galeria: string[];
    bio: string;
    fk_sponsor: number;

    constructor(pNombre:string, pApellidos:string, pEdad:number, pSexo:string, pPais:string, pTelefono:string, pEmail:string, pDisciplina:string, pExperiencia:string, pMarcas_personales:string[], pGaleria:string[], pBio:string, pFk_sponsor:number) {
        this.nombre = pNombre;
        this.apellidos = pApellidos;
        this.edad = pEdad;
        this.sexo = pSexo;
        this.pais = pPais;
        this.telefono = pTelefono;
        this.email = pEmail;
        this.disciplina = pDisciplina;
        this.experiencia = pExperiencia;
        this.marcas_personales = pMarcas_personales;
        this.galeria = pGaleria;
        this.bio = pBio;
        this.fk_sponsor = pFk_sponsor;
    }
}