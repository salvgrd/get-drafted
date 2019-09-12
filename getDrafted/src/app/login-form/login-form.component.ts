import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
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
    this.atletasService.loginAtleta(this.login.value)
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
          console.log(response);
          localStorage.setItem('token-atleta', response['token']);
          alert('Login succesfull');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
