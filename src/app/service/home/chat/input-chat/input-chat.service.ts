import { Injectable } from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {ContactTo} from "../../../../model/contact-to";
import {User} from "../../../../model/user";

@Injectable({
  providedIn: 'root'
})
export class InputChatService {

  toMessage: string = 'chk1'
  constructor(private connect: TestConnectService) {
    ContactTo.contactTo.subscribe((msg:User)=>{
      this.toMessage = msg.name
    })
  }

  submitMessage(userText: string) {
    console.log(userText)
    // first invoke observable by subscribe function
    this.connect.messages.subscribe(msg => {
    });
    // second send signal next then observable will catch it
    setTimeout(()=>{
      this.connect.messages.next(Api.sendMessage(this.toMessage, userText));
    },100)
  }
}
