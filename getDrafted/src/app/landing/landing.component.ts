import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
  }
  onAnchorClick ( ) {
    this.route.fragment.subscribe ( f => {
      const element = document.querySelector( "#" + f )
      if(element)element.scrollIntoView({block: "start", behavior: "smooth"})
    });
  }

}
