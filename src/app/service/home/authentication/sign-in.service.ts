import {Injectable} from '@angular/core';
import {Api} from "../../api/api";
import {TestConnectService} from "../../api/testConnectService";
import {Router} from "@angular/router";
import {ContactTo} from "../../../model/contact-to";
import {User} from "../../../model/user";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private connect: TestConnectService, private router: Router) {
    ContactTo.contactTo.subscribe((msg: User) => {

    })
  }

  submitSignIn(username: string, password: string) {
    // first invoke observable by subscribe function
    this.connect.messages.subscribe(msg => {
      console.log(msg)
      if (msg.status === 'success') {
        ContactTo.isLogin = true;
        this.router.navigate(['/home']);
      } else {
        alert("Lỗi")
      }
    });
    // second send signal next then observable will catch it
    setTimeout(() => {
      console.log(username + password)
      this.connect.messages.next(Api.login(username, password));
    }, 100)
  }

  logout() {
    localStorage.removeItem("userName")
    this.router.navigate(['/logIn']);
  }
}
