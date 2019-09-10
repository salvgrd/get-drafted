import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-atleta',
  templateUrl: './formulario-atleta.component.html',
  styleUrls: ['./formulario-atleta.component.css']
})
export class FormularioAtletaComponent implements OnInit {
  formulario: FormGroup;

  constructor(private atletasService: AtletasService, private router: Router) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(2)
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)
      ]),
      sexo: new FormControl('', [
        Validators.required
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)
      ]),
      telefono: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(12)
      ]),
      disciplina: new FormControl('', [
        Validators.required
      ]),
      ubicacion: new FormControl('', [
        Validators.required
      ]),
      edad: new FormControl('', [
        Validators.required,
        this.edadValidator
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
  }

  onSubmit() {
    this.atletasService.registrarAtleta(this.formulario.value)
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
           alert('usuario registrado.')
        }
      })
      .catch((err) => {
        console.log(err);
      })
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
      return { passwordvalidator: 'Las contraseñas no coinciden'}
    }
  }
}
