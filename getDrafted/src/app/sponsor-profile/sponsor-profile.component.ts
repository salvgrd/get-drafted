import { Component, OnInit } from '@angular/core';
import { AtletasService } from '../atletas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sponsor-profile',
  templateUrl: './sponsor-profile.component.html',
  styleUrls: ['./sponsor-profile.component.css']
})
export class SponsorProfileComponent implements OnInit {

  sponsor: any;

  constructor(private atletasService: AtletasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.atletasService.getSponsorById(params.userid)
        .then((response) => {
          this.sponsor = response;
        })
        .catch((err) => {
          console.log(err);
        })
    });
  }

}
