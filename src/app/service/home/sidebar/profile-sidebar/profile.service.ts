import { Injectable } from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  statusUser: any;

  constructor(private _testConnectService: TestConnectService) { }

  runService() {
    this.updateInfoUser();
  }
  init() {
    setTimeout(() => {
      this._testConnectService.messages.subscribe(msg => {
        this.loadInfoUser(msg);
      });
      setTimeout(() => {
        this._testConnectService.messages.next(Api.get_user_list("chk2"));
      })
    })
  }
  updateInfoUser() {
    setTimeout(() => {
      this.init();
    }, 50)
  }
  loadInfoUser(msg: any) {
    this.statusUser = msg.status;
    return this.statusUser;
  }
}
