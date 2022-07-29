import { Injectable } from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupList: Array<any> = [];
  constructor(private _testConnectService: TestConnectService) { }

  runService() {
    this.updateGroupList();
  }
  init() {
    setTimeout(() => {
      this._testConnectService.messages.subscribe(msg => {
        this.renderGroupList(msg);
      });
      setTimeout(() => {
        this._testConnectService.messages.next(Api.loadUserList());
      } ,300)
    },300)
  }

  updateGroupList() {
    setTimeout(() => {
      this.init();
    }, 1000)
  }

  renderGroupList(msg: any) {
    this.groupList = msg.data;
    return this.groupList;
  }
}
