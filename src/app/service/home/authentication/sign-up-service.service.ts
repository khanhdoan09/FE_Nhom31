import { Injectable } from '@angular/core';
import {TestConnectService} from "../../api/testConnectService";
import {ContactTo} from "../../../model/contact-to";
import {User} from "../../../model/user";
import {Api} from "../../api/api";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private connect: TestConnectService ,private router: Router) {
    ContactTo.contactTo.subscribe((msg:User)=>{

    })
  }

  submitSignUp(username: string, password: string) {
    // first invoke observable by subscribe function
    this.connect.messages.subscribe(msg => {
      this.router.navigate(['/logIn']);
    });
    // second send signal next then observable will catch it
    setTimeout(()=>{
      this.connect.messages.next(Api.signUp(username,password));
    },100)
  }
}
