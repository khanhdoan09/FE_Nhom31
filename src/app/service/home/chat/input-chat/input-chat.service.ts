import { Injectable } from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";

@Injectable({
  providedIn: 'root'
})
export class InputChatService {

  constructor(private connect: TestConnectService) {
  }

  submitMessage(userText: string) {
    // first invoke observable by subscribe function
    this.connect.messages.subscribe(msg => {
    });
    // second send signal next then observable will catch it
    setTimeout(()=>{
      this.connect.messages.next(Api.sendMessage("", userText));
    },100)
  }
}
