import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TestConnectService} from 'src/app/service/api/testConnectService';
import {Api} from "../../../../../service/api/api";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  isShowing = false;
  groupList : Array<any> = [];
  groupListAvavatar : Array<any> = [];
  avatarG:any;
  constructor(
    private _testConnectService: TestConnectService
  ) {
    this.updateGroupList();
  }

  init() {
    setTimeout(() => {
      this._testConnectService.messages.subscribe(msg => {
        this.renderGroupList(msg);
      });
      setTimeout(() => {
        this._testConnectService.messages.next(Api.loadUserList());
      }, 500)
    }, 500)
  }

  updateGroupList() {
    setTimeout(() => {
      this.init();
    }, 1500)
  }

   renderGroupList(msg: any) {
     console.log('Danh sách tin nhắn nhóm')
     for (let u of msg.data) {
       if (u.type === 1) {
         this.groupList.push(u);
       }
     }
     console.log(this.groupList);
     return this.groupList;
   }

  ngOnInit(): void {
  }

  openModal() {

  }
}
