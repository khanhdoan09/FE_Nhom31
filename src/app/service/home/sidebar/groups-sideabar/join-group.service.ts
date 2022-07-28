import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";

@Injectable({
  providedIn: 'root'
})
export class JoinGroupService {
  nameJoinRoom: any;
  statusJoinRoom: any;
  mesJoinRoom: any;
  userList = [];

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
    },0)
  }

  renderDataJoinGroup(msg: any) {
    console.log(msg)
    this.statusJoinRoom = msg.status;
    this.mesJoinRoom = msg.mes;
    this.userList = msg.userList;

    // console.log(this.statusJoinRoom)
    return msg;
  }

}
