import {ChangeDetectorRef, Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {setIsHasMoreData} from "../../../../model/pagination";
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
  oldArrayMessages: any = []
  date: any = null


  constructor(private connect: TestConnectService, public contentChatService: ContentChatService) {
  }

  updateDate(newDate: any) {
    this.cd.detach()
    this.date = newDate
    return true
  }

  // update message from api once 1.5s
  updateMessage() {
    setTimeout(() => {
      this.getMessageFromApi()
    }, 1000)
  }

  getMessageFromApi() {
    // first invoke observable by subscribe function
    this.connect.messages.subscribe(msg => {
      this.renderMessage(msg)
    });
    // second send signal next then observable will catch it
    setTimeout(() => {
      this.connect.messages.next(Api.loadOldMessageList(this.toMessage));
    }, 1000)
  }

  // render message to screen
  renderMessage(msg: any) {
    this.cd.reattach()
    if (msg != null) {
      if (msg.data.length != 0) {
        Array.prototype.push.apply(this.oldArrayMessages, msg.data);
        console.log(this.oldArrayMessages)
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
