import { Injectable } from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {ContactTo} from "../../../../model/contact-to";
import {User} from "../../../../model/user";
import {Subject} from "rxjs";
import {MessageApi} from "../../../../model/message_api";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";
import {WebSocketService} from "../../../websocket/websocket_service";

@Injectable({
  providedIn: 'root'
})

export class InputChatService {
  public connect!: Subject<any>;

  public create() {
    this.connect = <Subject<MessageApi>>this.ws.connect(configure.CHAT_URL).pipe(map(
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

  // choose contact with user or group
  typeChooseText:string=""
  toContact: string = 'chk1'
  constructor(private ws: WebSocketService) {
    this.create()
    ContactTo.contactTo.subscribe((msg:User)=>{
      // choose contact with user
      if (msg.type == 0) {
          this.typeChooseText = 'user'
      }
      // choose contact with group
      else {
          this.typeChooseText = 'group'
      }
      // choose contact name
      this.toContact = msg.name
    })
  }

  submitMessage(contactText: string) {
    if (contactText != null || contactText != '' || /\s/.test(contactText) == false) {
      // first invoke observable by subscribe function
      this.connect.subscribe(msg => {
      });
      // second send signal next then observable will catch it
      setTimeout(()=>{
        // contact with user
        if (this.typeChooseText === 'user') {
          this.connect.next(Api.sendMessage(this.toContact, contactText));
        }
        // contact with group
        else {
          this.connect.next(Api.sendMessageToGroup(this.toContact, contactText));
        }
      },100)
    }
  }
}
