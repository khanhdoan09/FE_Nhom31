import {Injectable} from '@angular/core';
import {Api} from "../../../api/api";
import {MessageApi} from "../../../../model/message_api";
import {ConnectApi} from "../../../websocket/connect-api";
import {IdSetInterval} from "../../../../model/contact-to";
import {GroupsService} from "./groups.service";
import {ChatsSidebarService} from "../chats-sidebar/chats-sidebar.service";
import {ContentChatService} from "../../chat/content-chat/content-chat.service";

@Injectable({
  providedIn: 'root'
})
export class CreateGroupService {
  nameRoom: any;
  statusCreated: any;
  public dataCreated!: MessageApi;

  constructor(private connect: ConnectApi, private _groupsService: GroupsService, private chatSidebarService: ChatsSidebarService, public contentChatService: ContentChatService) {
  }

  runService(nameRoom: any) {
    this.nameRoom = nameRoom;
    this.updateCreateGroup();
  }

  init() {
    this.connect.subject?.subscribe(msg => {
      this.renderDataCreateGroup(msg);
      if (msg.event != 'CREATE_ROOM') {
        this.init();
      }
      else {
        this.renderDataCreateGroup(msg);
        this.contentChatService.runService();
        this._groupsService.runService();
      }
      return;
    })

    if (IdSetInterval.idSetIntervalMessage) {
      clearInterval(IdSetInterval.idSetIntervalMessage)
    }
    IdSetInterval.clearAllIntervalInSideBar();
    this.connect.subject?.next(Api.create_room(this.nameRoom));
  }

  updateCreateGroup() {
    setTimeout(() => {
      this.init();
    })
  }

  renderDataCreateGroup(msg: any) {
    this.dataCreated = msg;
    console.log(this.dataCreated)
  }
}
