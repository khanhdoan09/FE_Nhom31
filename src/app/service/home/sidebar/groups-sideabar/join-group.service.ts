import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {MessageApi} from "../../../../model/message_api";

@Injectable({
  providedIn: 'root'
})
export class JoinGroupService {
  nameJoinRoom: any;
  userList = [];
  public dataJoin!: MessageApi;

  constructor(
    private _testConnectService: TestConnectService
  ) {
  }

  runService(nameRoomJ: any) {
    this.nameJoinRoom = nameRoomJ;
    this.updateJoinGroup();
  }

  init() {
    setTimeout(() => {
      this._testConnectService.messages.subscribe(msg => {
        this.renderDataJoinGroup(msg);
      });
      setTimeout(() => {
        this._testConnectService.messages.next(Api.join_room(this.nameJoinRoom));
      }, 0)
    }, 0)
  }

  updateJoinGroup() {
    setTimeout(() => {
      this.init();
    }, 0)
  }

  renderDataJoinGroup(msg: any) {
    this.dataJoin = msg;
    console.log(this.dataJoin)

    return this.dataJoin;
  }

}
