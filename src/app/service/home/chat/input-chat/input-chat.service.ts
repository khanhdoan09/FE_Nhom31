import { Injectable } from '@angular/core';
import {Api} from "../../../api/api";
import {ContactTo} from "../../../../model/contact-to";
import {User} from "../../../../model/user";
import {ConnectApi} from "../../../websocket/connect-api";

@Injectable({
  providedIn: 'root'
})

export class InputChatService {

  // choose contact with user or group
  typeChooseText:string=""
  toContact: string = 'chk1'
  constructor(private connect: ConnectApi) {
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
          this.connect.subject?.next(Api.sendMessage(this.toContact, contactText));
          this.connect.subject?.subscribe(msg => {

          });
        }
        // contact with group
        else {
          this.connect.subject?.next(Api.sendMessageToGroup(this.toContact, contactText));
        }
    }


  }
}
