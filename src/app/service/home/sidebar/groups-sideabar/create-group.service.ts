import {Injectable} from '@angular/core';
import {TestConnectService} from 'src/app/service/api/testConnectService';
import {Api} from "../../../api/api";

@Injectable({
  providedIn: 'root'
})
export class CreateGroupService {
  nameRoom: any;

  constructor(private _testConnectService: TestConnectService) {
  }


  runService(nameRoom: any) {
    this.nameRoom = nameRoom;
    this.updateCreateGroup();
  }

  init() {
    setTimeout(() => {
      this._testConnectService.messages.subscribe(msg => {
        this.renderDataCreateGroup(msg);
      });
      setTimeout(() => {
        this._testConnectService.messages.next(Api.create_room(this.nameRoom));
      }, 500)
    }, 500)
  }

  updateCreateGroup() {
    setTimeout(() => {
      this.init();
    }, 1500)
  }

  renderDataCreateGroup(msg: any) {
    console.log(msg)
    return msg.data;
  }
}
