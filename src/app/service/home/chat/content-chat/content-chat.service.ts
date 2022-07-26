import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Api} from "../../../api/api";
import {TestConnectService} from "../../../api/testConnectService";
import {MessageApi} from "../../../../model/message_api";
import {ContactTo} from "../../../../model/contact-to";
import {User} from "../../../../model/user";

@Injectable({
  providedIn: 'root'
})
export class ContentChatService {

  cd!: ChangeDetectorRef
  constructor(private connect: TestConnectService) {

    localStorage.setItem("userName", "chk2");

    // first invoke observable by subscribe function
    const loginObservable = this.connect.messages.subscribe(msg => {
      let user: MessageApi = msg;
      if (user.status == 'success') {
        ContactTo.contactTo.subscribe((msg:User)=>{
          this.toMessage = msg.name
          this.typeMessage = msg.type
          this.date = null
        })
        // load message
        this.updateMessage()
      }
    });

    // second send signal next then observable will catch it
    setTimeout(()=>{
      // login default with user ti
      this.connect.messages.next(Api.login("", ""));
    },1000)
  }
  // first just default
  toMessage = 'chk1'
  typeMessage = 0

  messages: any = ['','']
  date:any = null
  updateDate(newDate: any) {
    this.cd.detach()
    this.date = newDate
    return true
  }

  // update message from api once 0.5s
  updateMessage() {
    setInterval(()=>{
      this.getMessageFromApi()
    }, 1500)
  }

  getMessageFromApi() {
    // first invoke observable by subscribe function
    this.connect.messages.subscribe(msg => {
      this.renderMessage(msg)
    });
    // second send signal next then observable will catch it
    setTimeout(()=>{
      this.connect.messages.next(Api.loadMessageList(this.toMessage, 0));
    }, 1000)
  }

  // render message to screen
  renderMessage(msg: any) {
    this.cd.reattach()
    this.messages = msg.data
    this.date = null
  }
}
