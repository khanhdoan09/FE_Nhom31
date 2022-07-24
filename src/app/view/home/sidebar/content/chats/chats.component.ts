import {Component, OnInit} from '@angular/core';
import {Api} from "../../../../../service/api/api";
import {TestConnectService} from "../../../../../service/api/testConnectService";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  public userList: Array<any> = [];


  constructor(private _testConnectService: TestConnectService) {
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
      }, 250)

    }, 250)
  }

  updateUser() {
    // success  edit 'setTimeout' => 'setInterval'
    setTimeout(() => {
      this.init();
    }, 1000)
  }

  // render message to screen
  renderListUser(msg: any) {
    console.log("Danh sach tin nhan don")
    for (let u of msg.data) {
      if (u.type === 0) {
        this.userList.push(u);
      }
    }
    console.log(this.userList)
  }

  ngOnInit(): void {

  }
}
