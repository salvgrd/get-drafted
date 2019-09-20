import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sponsor-profile',
  templateUrl: './sponsor-profile.component.html',
  styleUrls: ['./sponsor-profile.component.css']
})
export class SponsorProfileComponent implements OnInit {
  formulario: FormGroup;
  editar: boolean = false;
  sponsor: any;
  sponsorEnviado: any;
  owner: boolean;
  constructor(private atletasService: AtletasService, private activatedRoute: ActivatedRoute) {
    this.owner = false;
    this.sponsor = {};
    this.sponsorEnviado = {};
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      let loggedId = this.atletasService.loggedAsId;
      let usertype = this.atletasService.loggedAs;
      let profileId = params.userid
      if (loggedId == profileId && usertype == 'sponsor') this.owner = true;
    })
    /* this.atletasService.getAtletaById()
    .then((response) => {
        this.atleta = response
      })
      .catch((err)=>{
        console.log(err);
      }) */
    this.activatedRoute.params.subscribe(params => {
      this.atletasService.getSponsorById(params.userid)
        .then((response) => {
          this.sponsor = response;
          this.createForm();
        })
        .catch((err) => {
          console.log(err);
        })
    });
  }

  createForm(){
    this.formulario = new FormGroup({
      nombre: new FormControl(this.sponsor.nombre, [
        Validators.required,
        Validators.maxLength(60),
        Validators.minLength(2)
      ]),
      ubicacion: new FormControl(this.sponsor.ubicacion, [
        Validators.required
      ]),
      telefono: new FormControl(this.sponsor.telefono, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12)
      ]),
      disciplina: new FormControl(this.sponsor.disciplina, [
        Validators.required
      ]),
      bio: new FormControl(this.sponsor.bio, [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(1000)
      ]),
      beneficios: new FormControl(this.sponsor.beneficios, [
        Validators.required
      ]),
      galeria: new FormControl(this.sponsor.galeria, [
        Validators.required
      ]),
      password: new FormControl(this.sponsor.password, [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
      ]),
      password_repeat: new FormControl(this.sponsor.password_repeat)
    }, [
        Validators.required,
        this.equalPasswordValidator
      ]);
  }
  onSubmit() {
    this.editar = !this.editar;
    this.atletasService.updateSponsor(this.formulario.value)
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
      this.atletasService.getSponsorById(params.userid)
        .then((response) => {
          this.sponsor = response;
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
