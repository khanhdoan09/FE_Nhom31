import {Injectable} from '@angular/core';
import {TestConnectService} from "../../api/testConnectService";
import {ContactTo} from "../../../model/contact-to";
import {User} from "../../../model/user";
import {Api} from "../../api/api";
import {Router} from "@angular/router";
import {ConnectApi} from "../../websocket/connect-api";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private connect: ConnectApi, private router: Router) {
    ContactTo.contactTo.subscribe((msg: User) => {

    })
  }

  submitSignUp(username: string, password: string) {
    // first invoke observable by subscribe function
    this.connect.subject?.subscribe(msg => {

      if (msg.mes === "Creating account error, Duplicate Username") {
        alert("Tài khoản đã tồn tại!")
        return;
      }
      if (msg.status === 'success') {
        this.router.navigate(['/logIn']);
      } else {
        alert("Lỗi");
      }
    });
    // second send signal next then observable will catch it
    setTimeout(() => {
      this.connect.subject?.next(Api.signUp(username, password));
    }, 100)
  }
}
