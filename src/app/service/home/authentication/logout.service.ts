import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {TestConnectService} from "../../api/testConnectService";
import {Router} from "@angular/router";
import {WebSocketService} from "../../websocket/websocket_service";
import {MessageApi} from "../../../model/message_api";
import {configure} from "../../../configure/Configure";
import {map} from "rxjs/operators";
import {ArrayAvatar, ContactTo, IdSetInterval} from "../../../model/contact-to";
import {Api} from "../../api/api";
import {ConnectApi} from "../../websocket/connect-api";
import {OldContentChatService} from "../chat/old-content-chat/old-content-chat.service";
import {ContentChatService} from "../chat/content-chat/content-chat.service";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  constructor(private router: Router, private connect: ConnectApi, public oldContentChatService: OldContentChatService, public contentChatService: ContentChatService) {
  }

  logout() {
    // first invoke observable by subscribe function
    this.connect.subject?.next(Api.logout());
    this.connect.subject?.subscribe(msg => {
      console.log(msg)
      if (msg.status === 'success') {
        ContactTo.isLogin = false;
        this.connect.clearConnect();
        this.connect.create();
        IdSetInterval.clearAllInterval();
        this.oldContentChatService.messages = [];
        this.contentChatService.messages = [];
        ArrayAvatar.avatar.clear();
        this.router.navigate(['logIn']);
      } else {
        alert("Lỗi")
      }
    });
  }
}
