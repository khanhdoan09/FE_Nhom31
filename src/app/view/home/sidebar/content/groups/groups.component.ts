import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TestConnectService} from 'src/app/service/api/testConnectService';
import {ChatsSidebarService} from 'src/app/service/home/sidebar/chats-sidebar/chats-sidebar.service';
import {CreateGroupService} from 'src/app/service/home/sidebar/groups-sideabar/create-group.service';
import {JoinGroupService} from 'src/app/service/home/sidebar/groups-sideabar/join-group.service';
import {Api} from "../../../../../service/api/api";
import {GroupsService} from "../../../../../service/home/sidebar/groups-sideabar/groups.service";
import {Contact, ContactTo} from "../../../../../model/contact-to";
import {User} from "../../../../../model/user";
import {resetPagination} from "../../../../../model/pagination";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  nameRoom: any = '';
  nameJoinRoom: any;

  isShowing = false;
  isShowAddMember = false;
  txtSearchGroup: any;
  alertEmpty: any;

  uName: any = localStorage.getItem('userName');

  constructor(public _groupsService: GroupsService,
              public _createGroupService: CreateGroupService,
              public _joinGroupService: JoinGroupService,
  ) {
    this._groupsService.runService();
  }

  ngOnInit(): void {
  }


  createHandler() {
    this._createGroupService.runService(this.nameRoom);
    // this.isShowing = false;
  }

  joinHandler() {
    this._joinGroupService.runService(this.nameJoinRoom);
    this.nameJoinRoom = "";
  }

  selectMessage(contact: Contact) {
    resetPagination();
    ContactTo.contactTo.next(contact);
  }
}
