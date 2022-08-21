import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {MessageApi} from "../../../../model/message_api";
import {Subject} from "rxjs";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";
import {WebSocketService} from "../../../websocket/websocket_service";
import {ConnectApi} from "../../../websocket/connect-api";

@Injectable({
  providedIn: 'root'
})
export class JoinGroupService {
  nameJoinRoom: any;
  userList = [];
  public dataJoin!: MessageApi;

  constructor(private connect: ConnectApi) {
  }

  runService(nameRoomJ: any) {
    this.nameJoinRoom = nameRoomJ;
    this.updateJoinGroup();
  }

  init() {
    setTimeout(() => {
      this.connect.subject?.subscribe(msg => {
        this.renderDataJoinGroup(msg);
      });
      setTimeout(() => {
        this.connect.subject?.next(Api.join_room(this.nameJoinRoom));
      }, )
    }, 0)
  }

  updateJoinGroup() {
    setTimeout(() => {
      this.init();
    }, 0)
  }

  renderDataJoinGroup(msg: any) {
    console.log(msg)
    this.dataJoin = msg;
  }

}
