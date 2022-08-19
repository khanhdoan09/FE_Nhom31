import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {MessageApi} from "../../../../model/message_api";
import {Subject} from "rxjs";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";
import {WebSocketService} from "../../../websocket/websocket_service";

@Injectable({
  providedIn: 'root'
})
export class JoinGroupService {
  nameJoinRoom: any;
  userList = [];
  public dataJoin!: MessageApi;
  public connect!: Subject<any>;

  constructor(private ws: WebSocketService) {
    this.create()
  }


  public create() {
    this.connect = <Subject<MessageApi>>this.ws.connect(configure.CHAT_URL).pipe(map(
      (response: MessageEvent): MessageApi => {
        let data = JSON.parse(response.data);
        return {
          status: data.status,
          data: data.data,
          mes: data.mes,
          event: data.event
        };
      }
    ));
  }

  runService(nameRoomJ: any) {
    this.nameJoinRoom = nameRoomJ;
    this.updateJoinGroup();
  }

  init() {
    setTimeout(() => {
      this.connect.subscribe(msg => {
        this.renderDataJoinGroup(msg);
      });
      setTimeout(() => {
        this.connect.next(Api.join_room(this.nameJoinRoom));
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
