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


  constructor(private connect: TestConnectService) {
    this.updateUser();
  }

  init = () => {
    // wait for login
    setTimeout(() => {
      // first invoke observable by subscribe function
      this.connect.messages.subscribe(msg => {
        this.renderListUser(msg);
      });
      setTimeout(() => {
        // second send signal next then observable will catch it
        this.connect.messages.next(Api.loadUserList());
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

    this.userList = msg.data;
    console.log(this.userList);
  }

  ngOnInit(): void {

  }
}
