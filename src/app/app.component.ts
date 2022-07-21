import { Component } from '@angular/core';
import {Api} from "./service/api/api";
import {WebSocketService} from "./service/websocket/websocket_service";
import {TestConnectService} from "./service/api/testConnectService";
import {MessageApi} from "./model/message_api";
import {Locale} from "ngx-bootstrap/chronos/locale/locale.class";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
  providers: [WebSocketService, TestConnectService]
})
export class AppComponent {
  title = 'mdb5-angular-ui-kit-pro-advanced';
  // test api
  constructor(private testConnectService: TestConnectService) {
    this.testConnectService.messages.subscribe(msg => {
      let user: MessageApi = msg;
      if (user.status == 'success') {
        localStorage.setItem("userName", "ti");
      }
    });
    setTimeout(()=>{
      // first login with user ti
      this.testConnectService.messages.next(Api.login("ti", "12345"));
      // second load message of user ti with user long
      this.loadMessage()
    }, 1000)
  }

  loadMessage() {
    setTimeout(()=>{
      this.testConnectService.messages.subscribe(msg => {
        localStorage.setItem("loadMessage", JSON.stringify(msg))
      });
      this.testConnectService.messages.next(Api.loadMessage("long", 0));
    }, 1000)
  }
}
