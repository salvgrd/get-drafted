import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-atleta',
  templateUrl: './formulario-atleta.component.html',
  styleUrls: ['./formulario-atleta.component.css']
})
export class FormularioAtletaComponent implements OnInit {
  formulario: FormGroup;

  constructor() {
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
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)
      ]),
      tel: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(12)
      ]),
      disci: new FormControl('', [
        Validators.required
      ]),
      pais: new FormControl('', [
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
    console.log(this.formulario.value);
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
