import {Injectable} from '@angular/core';
import {TestConnectService} from 'src/app/service/api/testConnectService';
import {Api} from "../../../api/api";
import {MessageApi} from "../../../../model/message_api";
import {WebSocketService} from "../../../websocket/websocket_service";
import {Subject} from "rxjs";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";
import {ConnectApi} from "../../../websocket/connect-api";

@Injectable({
  providedIn: 'root'
})
export class CreateGroupService {
  nameRoom: any;
  statusCreated: any;
  public dataCreated!: MessageApi;

  constructor(private connect: ConnectApi) {
  }

  runService(nameRoom: any) {
    this.nameRoom = nameRoom;
    this.updateCreateGroup();
  }

  init() {
    setTimeout(() => {
      this.connect.subject?.subscribe(msg => {
        console.log(msg)
        this.renderDataCreateGroup(msg);
      });
      setTimeout(() => {
        this.connect.subject?.next(Api.create_room(this.nameRoom));
      })
    })
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
