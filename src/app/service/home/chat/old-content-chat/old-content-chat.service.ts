import {ChangeDetectorRef, Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {isHasMoreData, setIsHasMoreData} from "../../../../model/pagination";
import {ContentChatService} from "../content-chat/content-chat.service";
import {Contact, ContactTo} from "../../../../model/contact-to";
import {WebSocketService} from "../../../websocket/websocket_service";
import {Subject} from "rxjs";
import {MessageApi} from "../../../../model/message_api";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OldContentChatService {

  cd!: ChangeDetectorRef
  // first just default
  toMessage = 'chk1'
  pagination = 0
  typeMessage = 0
  messages: any = []
  date: any = ''
  typeChooseText:string=""
  public connect!: Subject<any>;


  constructor(private ws: WebSocketService, public contentChatService: ContentChatService) {
    this.create()
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

  updateDate(newDate: any) {
    // = null la do luc dau chua tinh
      if (this.date != newDate && this.date == null) {
        this.cd.detach()
        this.date = newDate
        return false
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
    setTimeout(() => {
      this.getMessageFromApi()
    }, 500)
  }

  getMessageFromApi() {
    // first invoke observable by subscribe function
    this.connect.subscribe(msg => {
      this.renderMessage(msg)
    });
    // second send signal next then observable will catch it
    setTimeout(() => {
      if (this.typeChooseText==='user') {
        this.connect.next(Api.loadOldMessageList(this.toMessage));
      }
      else if (this.typeChooseText==='group') {
        this.connect.next(Api.loadOldMessageListFromGroup(this.toMessage));
      }
      }, 500)
  }

  // render message to screen
  renderMessage(msg: any) {
    this.cd.reattach()
    if (msg != null) {
      if (this.typeChooseText==='user') {
        if (msg.data.length != 0) {
          Array.prototype.push.apply(this.messages, msg.data);
          this.date = null
          setTimeout(() => {
            this.contentChatService.updateMessage()
          }, 500)
        } else {
          setIsHasMoreData(false)
        }
      }
      // get text from type group
      else if (this.typeChooseText==='group') {
        if (msg.data.chatData.length != 0) {
          Array.prototype.push.apply(this.messages, msg.chatData.data);
          this.date = null
          setTimeout(() => {
            this.contentChatService.updateMessage()
          }, 500)
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
