import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Api} from "../../../api/api";
import {TestConnectService} from "../../../api/testConnectService";
import {MessageApi} from "../../../../model/message_api";
import {Contact, ContactTo, CurrentUser, IdSetInterval} from "../../../../model/contact-to";
import {User} from "../../../../model/user";
import {isHasMoreData, setIsHasMoreData} from "../../../../model/pagination";
import {IContentChat} from "../../../../model/content-chat";
import {WebSocketService} from "../../../websocket/websocket_service";
import {Subject} from "rxjs";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ConnectApi} from "../../../websocket/connect-api";

let idSetInterval: any = 0

@Injectable({
  providedIn: 'root'
})
export class ContentChatService implements IContentChat {

  // first just default
  typeChooseText: string = ""
  toMessage = 'test'
  pagination = 0
  isFirstInGetDate = true
  cd!: ChangeDetectorRef
  messages: any[] = []

  constructor(private connect: ConnectApi) {
  }

  public runService() {
    // first invoke observable by subscribe function
    ContactTo.contactTo.subscribe((msg: Contact) => {
      this.toMessage = msg.name
      this.date = null
      // choose contact with user
      if (msg.type == 0) {
        this.typeChooseText = 'user';
      }
      // choose contact with group
      else {
        this.typeChooseText = 'group';
      }
    })
    // load message
    this.updateMessage()
  }

  date: any = null

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
    } else if (this.date != newDate && this.date != null) {
      this.cd.detach()
      this.date = newDate
      return true
    } else {
      return false
    }
  }

  // update message from api once 1.5s
  updateMessage() {
    // this.cd.reattach()
    idSetInterval = setInterval(() => {
      // reset
      this.date = ''
      this.isFirstInGetDate = true
      this.getMessageFromApi()
    }, 500)
    IdSetInterval.idSetIntervalMessage = idSetInterval;
  }

  getMessageFromApi() {
    // first invoke observable by subscribe function
    this.connect.subject?.subscribe(msg => {
      this.renderMessage(msg)
    });
    // second send signal next then observable will catch it
      if (this.typeChooseText === 'user') {
        this.connect.subject?.next(Api.loadMessageList(this.toMessage));
      } else if (this.typeChooseText === 'group') {
        this.connect.subject?.next(Api.loadMessageListFromGroup(this.toMessage));
      }
  }

  // render message to screen
  renderMessage(msg: any) {
    if (msg.status == false) {
      return
    }
    // this.cd.reattach()
    if (msg != undefined) {
      // get text from type user
      if (this.typeChooseText === 'user') {
        if (msg.event === 'GET_PEOPLE_CHAT_MES') {
          if (msg.data != null && msg.data != undefined) {
            if (msg.data.length != 0) {
              this.messages = msg.data;
              this.date = null
            } else {
              setIsHasMoreData(false)
            }
          }
        }
      }
      // get text from type group
      else if (this.typeChooseText === 'group') {
        if (msg.event === 'GET_ROOM_CHAT_MES') {
          if (msg.data != null && msg.data != undefined) {
            if (msg.data.chatData.length != 0) {
              this.messages = msg.data.chatData;
              this.date = null
            } else {
              setIsHasMoreData(false)
            }
          }
        }
      } else {

      }
    }
    else {
    }
  }
}

export {idSetInterval}
