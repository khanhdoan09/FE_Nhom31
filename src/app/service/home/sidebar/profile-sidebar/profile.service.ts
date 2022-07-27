import { Injectable } from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {StatusUser} from "../../../../model/message_api";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userObject: StatusUser = {status: undefined};

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
    }, 1000)
  }
  loadInfoUser(msg: any) {
    this.userObject = msg.data;
    console.log(this.userObject)
  }
}
