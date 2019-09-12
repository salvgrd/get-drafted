import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-empresas',
  templateUrl: './login-empresas.component.html',
  styleUrls: ['./login-empresas.component.css']
})
export class LoginEmpresasComponent implements OnInit {
  login: FormGroup;
  constructor(private atletasService: AtletasService, private router: Router) {
    this.login = new FormGroup({
      correo: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    },[
      Validators.required
    ]);
  }

  ngOnInit() {
  }
  onLogin(){
    this.atletasService.loginSponsor(this.login.value)
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
          console.log(response);
          localStorage.setItem('token-sponsor', response['token']);
          alert('Login succesfull');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
