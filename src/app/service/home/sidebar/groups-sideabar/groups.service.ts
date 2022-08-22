import {Injectable} from '@angular/core';
import {Api} from "../../../api/api";
import {ConnectApi} from "../../../websocket/connect-api";
import {IdSetInterval} from "../../../../model/contact-to";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupList: Array<any> = [];

  constructor(private connect: ConnectApi) {
  }

  runService() {
    this.updateGroupList();
  }

  init() {
    IdSetInterval.idSetIntervalGroup = setInterval(()=>{
      this.connect.subject?.subscribe(msg => {
        if (msg.event === 'GET_USER_LIST') {
          this.renderGroupList(msg);
        }
      });
      this.connect.subject?.next(Api.loadUserList());
    }, 1000)
  }

  updateGroupList() {
    this.init();
  }

  renderGroupList(msg: any) {
    this.groupList = msg.data;
    return this.groupList;
  }
}
