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
export class JoinGroupService {
  nameJoinRoom: any;
  userList = [];
  public dataJoin!: MessageApi;

  constructor(private connect: ConnectApi, private _groupsService: GroupsService, private chatSidebarService: ChatsSidebarService, public contentChatService: ContentChatService) {
  }

  runService(nameRoomJ: any) {
    this.nameJoinRoom = nameRoomJ;
    this.updateJoinGroup();
  }

  init() {
      this.connect.subject?.subscribe(msg => {
        console.log(msg)
        if (msg.event != 'JOIN_ROOM') {
          this.init();
        }
        else {
          this.renderDataJoinGroup(msg);
          this.contentChatService.runService();
          this._groupsService.runService();
        }
        return;
      })

    if (IdSetInterval.idSetIntervalMessage) {
      clearInterval(IdSetInterval.idSetIntervalMessage)
    }
    IdSetInterval.clearAllIntervalInSideBar();
    this.connect.subject?.next(Api.join_room(this.nameJoinRoom));
  }

  updateJoinGroup() {
      this.init();
  }

  renderDataJoinGroup(msg: any) {
    this.dataJoin = msg;
  }

}
