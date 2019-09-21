import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  formulario: FormGroup;
  editar: boolean = false;
  owner: boolean;
  atleta: any;
  atletaEnviado: any;
  marcas: any;

  constructor(private atletasService: AtletasService, private activatedRoute: ActivatedRoute) {
    this.owner = false;
    this.atleta = {};
    this.atletaEnviado = {};
    this.marcas = { 
      'arrancada': 0, 
      'dos_tiempos': 0,
      'sentadilla': 0,
      'fran': 0,
      'grace': 0,
      'murph': 0,
      't50m': 0,
      't100m': 0,
      't200m': 0,
      't400m': 0,
      't800m': 0,
      }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      let loggedId = this.atletasService.loggedAsId;
      let usertype = this.atletasService.loggedAs;
      let profileId = params.userid
      if (loggedId == profileId && usertype == 'atleta') this.owner = true;
    })
    /* this.atletasService.getAtletaById()
    .then((response) => {
        this.atleta = response
      })
      .catch((err)=>{
        console.log(err);
      }) */
      this.activatedRoute.params.subscribe(params => {
        this.atletasService.getAtletaById(params.userid)
          .then((response) => {
            this.atleta = response;
            if(this.atleta.marcas_personales != "") this.marcas = JSON.parse(this.atleta.marcas_personales);
             this.createForm();
          })
          .catch((err) => {
            console.log(err);
          })
      });
  }

  createForm(){
    this.formulario = new FormGroup({
      nombre: new FormControl(this.atleta.nombre, [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(2)
      ]),
      apellidos: new FormControl(this.atleta.apellidos, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)
      ]),
      sexo: new FormControl(this.atleta.sexo, [
        Validators.required
      ]),
      telefono: new FormControl(this.atleta.telefono, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12)
      ]),
      disciplina: new FormControl(this.atleta.disciplina, [
        Validators.required
      ]),
      ubicacion: new FormControl(this.atleta.ubicacion, [
        Validators.required
      ]),
      edad: new FormControl(this.atleta.edad, [
        Validators.required,
        this.edadValidator
      ]),
      experiencia: new FormControl(this.atleta.experiencia, [
        Validators.required
      ]),
      marcas_personales: new FormControl(this.atleta.marcas_personales, [
        Validators.required
      ]),
      bio: new FormControl(this.atleta.bio, [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(1000)
      ]),
      galeria: new FormControl(this.atleta.galeria, [
        Validators.required
      ]),
      password: new FormControl(this.atleta.password, [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
      ]),
      password_repeat: new FormControl(this.atleta.password_repeat)
    }, [
        Validators.required,
        this.equalPasswordValidator
      ]);
  }
  onSubmit() {
    this.editar = !this.editar;
    this.atletasService.updateAtleta(this.formulario.value)
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
          console.log(response);
          this.reloadUser();
          this.atletasService.reloadVars();
          alert('usuario actualizado.')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  reloadUser() {
    this.activatedRoute.params.subscribe(params => {
      this.atletasService.getAtletaById(params.userid)
        .then((response) => {
          this.atleta = response;
          if(this.atleta.marcas_personales != "") this.marcas = JSON.parse(this.atleta.marcas_personales);
        })
        .catch((err) => {
          console.log(err);
        })
    });
  }

  //Esto es para activar los ngIF mosca cuando se pisa boton editar
  editarAtleta(){
    this.editar =!this.editar;
  }

  edadValidator(control) {
    let edadValue = control.value;
    let edadMinima = 12;

    if (edadValue >= edadMinima) {
      // Correcto
      return null;
    } else {
      // Incorrecto
      return { edadvalidator: { edadminima: edadMinima } };
    }
  }

  equalPasswordValidator(form) {
    let passwordValue = form.controls['password'].value;
    let passwordRepeatValue = form.controls['password_repeat'].value;

    if(passwordValue === passwordRepeatValue){
      return null;
    } else {
      //REVISAR ESTE RETURN NO LO ENVIA//
      return { passwordvalidator: 'Las contraseñas no coinciden'}
    }
  }

}
