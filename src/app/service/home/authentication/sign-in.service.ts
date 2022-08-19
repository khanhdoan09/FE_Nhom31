import {Injectable} from '@angular/core';
import {Api} from "../../api/api";
import {TestConnectService} from "../../api/testConnectService";
import {Router} from "@angular/router";
import {ContactTo} from "../../../model/contact-to";
import {User} from "../../../model/user";
import {Subject} from "rxjs";
import {MessageApi} from "../../../model/message_api";
import {configure} from "../../../configure/Configure";
import {map} from "rxjs/operators";
import {WebSocketService} from "../../websocket/websocket_service";

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  public anotherconnect!: Subject<any>;
  constructor(private connect: TestConnectService, private router: Router,private ws: WebSocketService) {
    this.create();
  }

  public create() {
    this.anotherconnect = <Subject<MessageApi>>this.ws.connect(configure.CHAT_URL).pipe(map(
      (response: MessageEvent): MessageApi => {
        let data = JSON.parse(response.data);
        return {
          status: data.status,
          data: data.data,
          mes: data.mes,
          event: data.event
        };
      }
    ));
  }
  submitSignIn(username: string, encryptPassword: string) {
    // first invoke observable by subscribe function
    this.connect.messages.subscribe(msg => {
      console.log(msg)
      if (msg.status === 'success') {
        ContactTo.isLogin = true;
        // alert(ContactTo.isLogin)
        this.router.navigate(['/home']);
      } else {
        alert("Lỗi")
      }
    });
    // second send signal next then observable will catch it
    setTimeout(() => {
      console.log(username + encryptPassword)
      this.connect.messages.next(Api.login(username, encryptPassword));
    }, 100)
  }

  logout() {
    ContactTo.isLogin = false;
    localStorage.removeItem("userName")
    this.router.navigate(['/logIn']);
  }
}
