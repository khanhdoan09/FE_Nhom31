import {Component} from '@angular/core';
import {Api} from "./service/api/api";
import {WebSocketService} from "./service/websocket/websocket_service";
import {TestConnectService} from "./service/api/testConnectService";
import {MessageApi} from "./model/message_api";
import {Locale} from "ngx-bootstrap/chronos/locale/locale.class";
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
  providers: [WebSocketService, TestConnectService]
})
export class AppComponent {
  title = 'mdb5-angular-ui-kit-pro-advanced';

}

