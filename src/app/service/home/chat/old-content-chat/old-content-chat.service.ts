import {ChangeDetectorRef, Injectable} from '@angular/core';
import {Api} from "../../../api/api";
import {isHasMoreData, setIsHasMoreData} from "../../../../model/pagination";
import {ContentChatService} from "../content-chat/content-chat.service";
import {Contact, ContactTo} from "../../../../model/contact-to";
import {Spinner} from "../../../../model/spinner";
import {ConnectApi} from "../../../websocket/connect-api";
import {ChatComponent} from "../../../../view/home/chat/chat.component";
import {GroupsService} from "../../sidebar/groups-sideabar/groups.service";
import {ChatsSidebarService} from "../../sidebar/chats-sidebar/chats-sidebar.service";

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


  constructor( public contentChatService: ContentChatService, private connect: ConnectApi, private _groupsService: GroupsService, private chatSidebarService: ChatsSidebarService) {
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
      this.getMessageFromApi();
    }, 500)
  }

  getMessageFromApi() {
    // first invoke observable by subscribe function
    this.connect.subject?.subscribe(msg => {
      if (msg.event.includes('_CHAT_MES')) {
        this.renderMessage(msg);
      }
      else {
        this.getMessageFromApi();
      }
    });
    // second send signal next then observable will catch it
    setTimeout(() => {
      if (this.typeChooseText==='user') {
        this.connect.subject?.next(Api.loadOldMessageList(this.toMessage));
      }
      else if (this.typeChooseText==='group') {
        this.connect.subject?.next(Api.loadOldMessageListFromGroup(this.toMessage));
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
          Spinner.changeShow(false)
          setTimeout(() => {
            this.contentChatService.updateMessage();
            this.chatSidebarService.runService();
          }, 500)
        } else {
          Spinner.changeShow(false)
          setIsHasMoreData(false)
        }
      }
      // get text from type group
      else if (this.typeChooseText==='group') {
        if (msg.data.chatData.length != 0) {
          Array.prototype.push.apply(this.messages, msg.data.chatData);
          this.date = null
          Spinner.changeShow(false)
          setTimeout(() => {
            this.contentChatService.updateMessage();
            this._groupsService.runService();
          }, 500)
        }
        else {
          Spinner.changeShow(false)
          setIsHasMoreData(false)
        }
      }
      else {
        Spinner.changeShow(false)
      }
    }
  }

  noMoreMessage() {
    if (this.typeChooseText === 'user') {
      this.contentChatService.updateMessage();
      this.chatSidebarService.runService();
    }
    else {
      this.contentChatService.updateMessage();
      this._groupsService.runService();
    }
  }
}
