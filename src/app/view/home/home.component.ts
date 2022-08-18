import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ContactTo} from "../../model/contact-to";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
    if(ContactTo.isLogin ===false) {
      this.router.navigate(['/logIn'])
    }
    else {
      this.router.navigate(['/home'])

    }
  }

  ngOnInit(): void {
  }

}
