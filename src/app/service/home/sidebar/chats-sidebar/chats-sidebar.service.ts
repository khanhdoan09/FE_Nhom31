import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {Contact, ContactTo} from "../../../../model/contact-to";
import {resetPagination} from "../../../../model/pagination";
import {set} from "@angular/fire/database";

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
        // this.checkStatusUser(msg)
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

  renderListUser(msg: any) {
    this.userList = msg.data;
    return this.userList;
  }




  selectMessage(contact: Contact) {
    resetPagination()
    ContactTo.contactTo.next(contact);
  }
}
