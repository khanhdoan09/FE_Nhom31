import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupList: Array<any> = [];

  constructor(private _testConnectService: TestConnectService) {
  }

  runService() {
    this.updateGroupList();
  }

  init() {
    this._testConnectService.messages.subscribe(msg => {
      this.renderGroupList(msg);
    });
    this._testConnectService.messages.next(Api.loadUserList());


  }

  updateGroupList() {
    this.init();
  }

  renderGroupList(msg: any) {
    this.groupList = msg.data;
    return this.groupList;
  }
}
