  import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageApi} from "../../../../model/message_api";
import {Api} from "../../../../service/api/api";
import {AppComponent} from "../../../../app.component";
import {TestConnectService} from "../../../../service/api/testConnectService";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {Subject} from "rxjs";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss']
})
export class ContentChatComponent implements OnInit {

  messages: any = ['','']
  // public messagesApi!: Subject<any>;

  constructor(private connect: TestConnectService) {
    localStorage.setItem("userName", "long");
    // first invoke observable by subscribe function
    const loginObservable = this.connect.messages.subscribe(msg => {
      let user: MessageApi = msg;
      if (user.status == 'success') {
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
    const loadMessageObservable = this.connect.messages.subscribe(msg => {
      this.renderMessage(msg)
    });
    // second send signal next then observable will catch it
    setTimeout(()=>{
      this.connect.messages.next(Api.loadMessageList("", 0));
    }, 100)
  }

  // render message to screen
  renderMessage(msg: any) {
    this.messages = msg.data
  }


  ngOnInit(): void {

  }


}
