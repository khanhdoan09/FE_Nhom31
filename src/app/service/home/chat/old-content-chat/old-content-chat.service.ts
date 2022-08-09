import {ChangeDetectorRef, Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {isHasMoreData, setIsHasMoreData} from "../../../../model/pagination";
import {ContentChatService} from "../content-chat/content-chat.service";

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


  constructor(private connect: TestConnectService, public contentChatService: ContentChatService) {

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
    this.connect.messages.subscribe(msg => {
      this.renderMessage(msg)
    });
    // second send signal next then observable will catch it
    setTimeout(() => {
      this.connect.messages.next(Api.loadOldMessageList(this.toMessage));
    }, 500)
  }

  // render message to screen
  renderMessage(msg: any) {
    this.cd.reattach()
    if (msg != null) {
      if (msg.data.length != 0) {
        Array.prototype.push.apply(this.messages, msg.data);
        this.date = null
        setTimeout(()=>{
          this.contentChatService.updateMessage()
        },500)
      }
      else {
        setIsHasMoreData(false)
      }
    }
  }
}
