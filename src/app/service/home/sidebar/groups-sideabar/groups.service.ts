import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {Subject} from "rxjs";
import {MessageApi} from "../../../../model/message_api";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";
import {WebSocketService} from "../../../websocket/websocket_service";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupList: Array<any> = [];
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


  runService() {
    this.updateGroupList();
  }

  init() {
    this.connect.subscribe(msg => {
      if (msg.event === 'GET_USER_LIST') {
        console.log(msg)
        this.renderGroupList(msg);
        return
      }
      else {
        console.log('not load group')
        this.init()
      }
    });
    this.connect.next(Api.loadUserList());
  }

  updateGroupList() {
    this.init();
  }

  renderGroupList(msg: any) {
    this.groupList = msg.data;
    return this.groupList;
  }
}
