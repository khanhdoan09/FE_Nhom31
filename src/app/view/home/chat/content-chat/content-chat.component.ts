import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MessageApi} from "../../../../model/message_api";
import {Api} from "../../../../service/api/api";
import {AppComponent} from "../../../../app.component";
import {TestConnectService} from "../../../../service/api/testConnectService";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {Subject} from "rxjs";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";
import { DatePipe } from '@angular/common';
import {ContactTo} from "../../../../model/contact-to";
import {User} from "../../../../model/user";

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss'],
  providers: [AppComponent]
})
export class ContentChatComponent implements OnInit {

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

  constructor(private connect: TestConnectService, private cd: ChangeDetectorRef) {

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


  ngOnInit(): void {

  }
}
