import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Api} from "../../../api/api";
import {TestConnectService} from "../../../api/testConnectService";
import {MessageApi} from "../../../../model/message_api";
import {ContactTo} from "../../../../model/contact-to";
import {User} from "../../../../model/user";
import {isHasMoreData, setIsHasMoreData} from "../../../../model/pagination";
import {IContentChat} from "../../../../model/content-chat";

let idSetInterval = 0

@Injectable({
  providedIn: 'root'
})
export class ContentChatService implements IContentChat{

  // first just default
  toMessage = 'chk1'
  pagination = 0
  typeMessage = 0
  isFirstInGetDate = true
  cd!: ChangeDetectorRef
  messages: any = []

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
    idSetInterval = setTimeout(()=>{
      // reset
      this.date = ''
      this.isFirstInGetDate = true
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
      this.connect.messages.next(Api.loadMessageList(this.toMessage));
    }, 1000)
  }

  // render message to screen
  renderMessage(msg: any) {
    // this.cd.reattach()
    if (msg != null) {
      if (msg.data.length != 0) {
        this.messages = msg.data;
        console.log(msg.data)
        this.date = null
      }
      else {
        setIsHasMoreData(false)
      }
    }
  }
}

export {idSetInterval}
