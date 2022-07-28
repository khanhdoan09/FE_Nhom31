import {Injectable} from '@angular/core';
import {TestConnectService} from 'src/app/service/api/testConnectService';
import {Api} from "../../../api/api";

@Injectable({
  providedIn: 'root'
})
export class CreateGroupService {
  nameRoom: any;
  statusCreated: any;
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
      })
    } )
  }

  updateCreateGroup() {
    setTimeout(() => {
      this.init();
    })
  }

  renderDataCreateGroup(msg: any) {
    console.log(msg)
    this.statusCreated = msg.status;
    return msg;
  }
}
