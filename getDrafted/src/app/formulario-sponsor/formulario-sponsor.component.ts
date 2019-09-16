import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-sponsor',
  templateUrl: './formulario-sponsor.component.html',
  styleUrls: ['./formulario-sponsor.component.css']
})
export class FormularioSponsorComponent implements OnInit {
  formulario: FormGroup;
  //////////////////////////////////////
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  /////////////////////////////////////

  constructor(private atletasService: AtletasService, private router: Router, private _formBuilder: FormBuilder) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
        Validators.minLength(2)
      ]),
      nombre_contacto: new FormControl('', [
        Validators.required,
        Validators.maxLength(80), 
        Validators.minLength(6)
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12)
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)
      ]),
      ubicacion: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
      ]),
      password_repeat: new FormControl('')
    }, [
        Validators.required,
        this.equalPasswordValidator
      ]);
  }

  ngOnInit() {
    // let controlEmail = this.formulario.controls['email']
    // controlEmail.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
    //   console.log(value);
    // })

    ////////////////////////////////////////
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    
    ////////////////////////////////////////
  }

  onSubmit() {
    this.atletasService.registrarSponsor(this.formulario.value)
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

  equalPasswordValidator(form) {
    let passwordValue = form.controls['password'].value;
    let passwordRepeatValue = form.controls['password_repeat'].value;

    if(passwordValue === passwordRepeatValue){
      return null;
    } else {
      return { passwordvalidator: 'Las contraseñas no coinciden'}
    }
  }

}
