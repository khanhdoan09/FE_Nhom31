import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  statusUser: any;
  userName: any = localStorage.getItem('userName');

  constructor(private _testConnectService: TestConnectService) {
  }

  runService(name: any) {
    this.userName = name;
    this.updateInfoUser();
  }

  init() {
    setTimeout(() => {
      this._testConnectService.messages.subscribe(msg => {
        this.loadInfoUser(msg);
      });
      setTimeout(() => {
        this._testConnectService.messages.next(Api.get_user_list(this.userName));
      })
    })
  }

  updateInfoUser() {
    setTimeout(() => {
      this.init();
    }, 50)
  }

  loadInfoUser(msg: any) {
    this.statusUser = msg.data.status;
    return this.statusUser;
  }
}
