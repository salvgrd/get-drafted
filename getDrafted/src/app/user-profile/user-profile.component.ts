import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  atleta: any;

  constructor(private atletasService: AtletasService, private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    /* this.atletasService.getAtletaById()
    .then((response) => {
        this.atleta = response
      })
      .catch((err)=>{
        console.log(err);
      }) */
      this.activatedRoute.params.subscribe(params => {
        this.atletasService.getAtletaById(params.userid)
          .then((response) => {
            this.atleta = response;
          })
          .catch((err) => {
            console.log(err);
          })
      });

  }

}
