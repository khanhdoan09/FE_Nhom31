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
  public anotherconnect!: Subject<any>;

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
      // second send signal next then observable will catch it
        // contact with user
        if (this.typeChooseText === 'user') {
          this.anotherconnect.next(Api.sendMessage(this.toContact, contactText));
          this.anotherconnect.subscribe(msg => {
            console.log('aaa:'+msg)
            console.log(msg)
          });
        }
        // contact with group
        else {
          this.anotherconnect.next(Api.sendMessageToGroup(this.toContact, contactText));
        }
    }


  }
}
