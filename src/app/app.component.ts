import { Component } from '@angular/core';
import {Api} from "./service/api/api";
import {WebSocketService} from "./service/websocket/websocket_service";
import {ConnectService} from "./service/api/connectService";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
  providers: [WebSocketService, ConnectService]
})
export class AppComponent {
  title = 'mdb5-angular-ui-kit-pro-advanced';
  // test api
  constructor(private connectService: ConnectService) {
    this.connectService.messages.subscribe(msg => {
      console.log(JSON.stringify(msg));
    });
    setTimeout(()=>{
      // first login with user ti
      this.connectService.messages.next(Api.login);
      // second load message of user ti with user long
      this.connectService.messages.next(Api.loadMessage);
    }, 1000)
  }
}
