import {Component} from '@angular/core';
import {WebSocketService} from "./service/websocket/websocket_service";
import {TestConnectService} from "./service/api/testConnectService";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
  providers: [WebSocketService, TestConnectService]
})

export class AppComponent {
  title = 'mdb5-angular-ui-kit-pro-advanced';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}

