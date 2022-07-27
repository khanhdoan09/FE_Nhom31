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
      }, 500)
    }, 500)
  }

  updateGroupList() {
    setTimeout(() => {
      this.init();
    }, 1500)
  }

  renderGroupList(msg: any) {
    console.log('Danh sách tin nhắn nhóm')
    var dataHandler:Array<any> = [];
    dataHandler = msg.data;
    for (let u of dataHandler) {
      if (u.type === 1) {
        this.groupList.push(u);
      }
    }
    console.log(this.groupList);
    return this.groupList;
  }
}
