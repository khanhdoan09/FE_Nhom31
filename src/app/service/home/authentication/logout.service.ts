import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {TestConnectService} from "../../api/testConnectService";
import {Router} from "@angular/router";
import {WebSocketService} from "../../websocket/websocket_service";
import {MessageApi} from "../../../model/message_api";
import {configure} from "../../../configure/Configure";
import {map} from "rxjs/operators";
import {ContactTo} from "../../../model/contact-to";
import {Api} from "../../api/api";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
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
  logout() {
    // first invoke observable by subscribe function
    console.log(1234)
    this.connect.messages.next(Api.logout());
    this.connect.messages.subscribe(msg => {
      console.log(msg)
      if (msg.status === 'success') {
        ContactTo.isLogin = false;
        // alert(ContactTo.isLogin)
        this.router.navigate(['/logIn']);
      } else {
        alert("Lỗi")
      }
    });
  }

}
