import {Injectable} from '@angular/core';
import {Api} from "../../../api/api";
import {MessageApi} from "../../../../model/message_api";
import {ConnectApi} from "../../../websocket/connect-api";

@Injectable({
  providedIn: 'root'
})
export class CreateGroupService {
  nameRoom: any;
  statusCreated: any;
  public dataCreated!: MessageApi;

  constructor(private connect: ConnectApi) {
  }

  runService(nameRoom: any) {
    this.nameRoom = nameRoom;
    this.updateCreateGroup();
  }

  init() {
    setTimeout(() => {
      this.connect.subject?.subscribe(msg => {
        console.log(msg)
        this.renderDataCreateGroup(msg);
      });
      setTimeout(() => {
        this.connect.subject?.next(Api.create_room(this.nameRoom));
      })
    })
  }

  updateCreateGroup() {
    setTimeout(() => {
      this.init();
    })
  }

  renderDataCreateGroup(msg: any) {
    this.dataCreated = msg;
    console.log(this.dataCreated)
  }
}
