import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-sponsor',
  templateUrl: './formulario-sponsor.component.html',
  styleUrls: ['./formulario-sponsor.component.css']
})
export class FormularioSponsorComponent implements OnInit {
  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nombre_sponsor: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
        Validators.minLength(2)
      ]),
      nombre_responsable: new FormControl('', [
        Validators.required,
        Validators.maxLength(80),
        Validators.minLength(6)
      ]),
      /* bio: new FormControl('', [
        Validators.required,
        Validators.maxLength(65535),
        Validators.minLength(20)
      ]), */
      tel: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)
      ]),
      pais: new FormControl('', [
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
  }

  onSubmit() {
    console.log(this.formulario.value);
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
