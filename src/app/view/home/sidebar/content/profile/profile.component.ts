import {Component, OnInit} from '@angular/core';
import {TestConnectService} from 'src/app/service/api/testConnectService';
import {Api} from "../../../../../service/api/api";
import {StatusUser} from "../../../../../model/message_api";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userObject: StatusUser = {status: undefined};
  userName: string;

  constructor(
    private _testConnectService: TestConnectService
  ) {
    this.updateInfoUser();
    this.userName = localStorage.getItem("userName") || ""
  }

  ngOnInit(): void {
  }

  init() {
    setTimeout(() => {
      this._testConnectService.messages.subscribe(msg => {
        this.loadInfoUser(msg);
      });
      setTimeout(() => {
        this._testConnectService.messages.next(Api.get_user_list("long"));
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
