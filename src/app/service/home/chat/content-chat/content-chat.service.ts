import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Api} from "../../../api/api";
import {TestConnectService} from "../../../api/testConnectService";
import {MessageApi} from "../../../../model/message_api";
import {Contact, ContactTo} from "../../../../model/contact-to";
import {User} from "../../../../model/user";
import {isHasMoreData, setIsHasMoreData} from "../../../../model/pagination";
import {IContentChat} from "../../../../model/content-chat";
import {WebSocketService} from "../../../websocket/websocket_service";
import {Subject} from "rxjs";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";

let idSetInterval = 0

@Injectable({
  providedIn: 'root'
})
export class ContentChatService implements IContentChat{

  // first just default
  typeChooseText:string=""
  toMessage = 'test'
  pagination = 0
  isFirstInGetDate = true
  cd!: ChangeDetectorRef
  messages: any = []
  public connect!: Subject<any>;

  constructor(private ws: WebSocketService) {
    this.create()
    localStorage.setItem("userName", "chk2");

    // first invoke observable by subscribe function
     this.connect.subscribe(msg => {
      let user: MessageApi = msg;
      if (user.status == 'success') {
        ContactTo.contactTo.subscribe((msg:Contact)=>{
          this.toMessage = msg.name
          this.date = null
          // choose contact with user
          if (msg.type == 0) {
            this.typeChooseText = 'user'
          }
          // choose contact with group
          else {
            this.typeChooseText = 'group'
          }
        })
        // load message
        this.updateMessage()
      }
    });

    // second send signal next then observable will catch it
    setTimeout(()=>{
      // login default with user ti
      this.connect.next(Api.login("", ""));
    },1000)
  }

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

  date:any = null
  updateDate(newDate: any) {

    // = null la do luc dau chua tinh
    if (this.date != newDate && this.date == null) {
      this.cd.detach()
      this.date = newDate
      return false
    }
    // gan ngay dau tien
    // new khong co isFirstInGetDate thi se gan cho ngay thu hai
    else if (this.date != newDate && this.date != null && this.isFirstInGetDate) {
      this.cd.detach()
      this.isFirstInGetDate = false
      return true
    }
    else if (this.date != newDate && this.date != null) {
      this.cd.detach()
      this.date = newDate
      return true
    }
    else {
      return false
    }
  }

  // update message from api once 1.5s
  updateMessage() {
    // this.cd.reattach()
    idSetInterval = setInterval(()=>{
      // reset
      this.date = ''
      this.isFirstInGetDate = true
      this.getMessageFromApi()
    }, 1500)
  }

  getMessageFromApi() {
    // first invoke observable by subscribe function
    this.connect.subscribe(msg => {
      this.renderMessage(msg)
    });
    // second send signal next then observable will catch it
    setTimeout(()=>{
      if (this.typeChooseText==='user') {
        this.connect.next(Api.loadMessageList(this.toMessage));
      }
      else if (this.typeChooseText==='group') {
        this.connect.next(Api.loadMessageListFromGroup(this.toMessage));
      }
    }, 1000)
  }

  // render message to screen
  renderMessage(msg: any) {
    // this.cd.reattach()
    if (msg != null) {
      // get text from type user
      if (this.typeChooseText==='user') {
        if (msg.data.length != 0) {
          this.messages = msg.data;
          console.log(msg.data)
          this.date = null
        }
        else {
          setIsHasMoreData(false)
        }
      }
      // get text from type group
      else if (this.typeChooseText==='group') {
        if (msg.data.chatData.length != 0) {
          this.messages = msg.data.chatData;
          console.log(msg.data.chatData)
          this.date = null
        }
        else {
          setIsHasMoreData(false)
        }
      }
      else {

      }
    }
  }
}

export {idSetInterval}
