import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material';
import { skip } from 'rxjs/operators';
import { SponsorModel } from '../models/sponsor.model'

@Component({
  selector: 'app-formulario-sponsor',
  templateUrl: './formulario-sponsor.component.html',
  styleUrls: ['./formulario-sponsor.component.css']
})
export class FormularioSponsorComponent implements OnInit {
  user: SponsorModel = new SponsorModel();
  registerForm: FormGroup;

  //////////////////////////////////////
  /* isLinear = false; */
  /////////////////////////////////////

  constructor(private atletasService: AtletasService, private router: Router, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      'nombre': new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
        Validators.minLength(2)
      ]),
      /* 'nombre_contacto': [this.user.nombre_contacto, [
        Validators.required,
        Validators.maxLength(80), 
        Validators.minLength(6)
      ]], */
      'ubicacion': new FormControl('', [
        Validators.required
      ]),
      'telefono': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12)
      ]),
      'correo': new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
      ]),
      'password_repeat': new FormControl('', [Validators.required])
    } , [
        Validators.required, 
        this.equalPasswordValidator
        ])
  }

  ngOnInit() {
    // let controlEmail = this.formulario.controls['email']
    // controlEmail.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
    //   console.log(value);
    // })
  }

  onSubmit() {
    this.atletasService.registrarSponsor(this.registerForm.value)
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
           console.log(response);
           alert('usuario registrado.');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  onRegisterSubmit(){
    console.log(this.user);
    /* this.atletasService.registrarSponsor(this.user)
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
           console.log(response);
           alert('usuario registrado.');
        }
      })
      .catch((err) => {
        console.log(err);
      }) */
  }

  equalPasswordValidator(form) {
    console.log('Hola');
    console.log(form);
    let passwordValue = form.controls['password'].value;
    let passwordRepeatValue = form.controls['password_repeat'].value;

    console.log(passwordValue);
    console.log(passwordRepeatValue);
    if(passwordValue === passwordRepeatValue){
      return null;
    } else {
      return { passwordvalidator: 'Las contraseñas no coinciden'}
    }
  }

}
