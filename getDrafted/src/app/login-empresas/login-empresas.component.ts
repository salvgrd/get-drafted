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
        Validators.required,
        Validators.pattern(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
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
          localStorage.setItem('token-sponsor', response['token']);
          localStorage.setItem('user-id', response['userId']);
          this.atletasService.reloadVars();
          this.router.navigate([`/sponsor/${response['userId']}`]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
