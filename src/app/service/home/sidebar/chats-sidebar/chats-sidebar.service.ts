import { Injectable } from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {User} from "../../../../model/user";
import {ContactTo} from "../../../../model/contact-to";

@Injectable({
  providedIn: 'root'
})
export class ChatsSidebarService {

  public userList: Array<any> = [];
  txtSearch: any;
  test: any = true;
  time: string = "";
  constructor(private _testConnectService: TestConnectService) {
  }

  runService() {
    this.updateUser();
  }

  init = () => {
    // wait for login
    setTimeout(() => {
      // first invoke observable by subscribe function
      this._testConnectService.messages.subscribe(msg => {
        this.renderListUser(msg);
      });
      setTimeout(() => {
        // second send signal next then observable will catch it
        this._testConnectService.messages.next(Api.loadUserList());
      }, 300)

    }, 300)
  }

  updateUser() {
    // success  edit 'setTimeout' => 'setInterval'
    setTimeout(() => {
      this.init();
    }, 1000)
  }

  // render message to screen

  renderListUser(msg: any) {
    var dataHandler:Array<any> = [];
    dataHandler = msg.data;
    this.userList = [];
    for (let u of dataHandler) {
      if ( u.type === 0) {
        this.userList.push(u);
      }
    }
    console.log(this.userList)
  }

  selectMessage(u: User) {
    ContactTo.contactTo.next(u);
  }
}
