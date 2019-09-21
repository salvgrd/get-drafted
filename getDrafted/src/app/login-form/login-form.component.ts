import { Component, OnInit, Output } from '@angular/core';
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
    this.atletasService.loginAtleta(this.login.value)
      .then((response) => {
        if (response['error']) {
          alert(response['error']);
        } else {
          localStorage.setItem('token-atleta', response['token']);
          localStorage.setItem('user-id', response['userId']);
          this.atletasService.reloadVars();
          this.router.navigate([`/atleta/${response['userId']}`]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
