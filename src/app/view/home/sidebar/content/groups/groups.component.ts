import {Component, OnInit} from '@angular/core';
import {CreateGroupService} from 'src/app/service/home/sidebar/groups-sideabar/create-group.service';
import {JoinGroupService} from 'src/app/service/home/sidebar/groups-sideabar/join-group.service';
import {GroupsService} from "../../../../../service/home/sidebar/groups-sideabar/groups.service";
import {Contact, ContactTo} from "../../../../../model/contact-to";

import {resetPagination} from "../../../../../model/pagination";
import {LanguageService} from "../../../../../service/home/language/language.service";


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
              public _languageService: LanguageService,

  ) {
    this._groupsService.runService();
  }

  ngOnInit(): void {

  }


  createHandler() {
    this._createGroupService.runService(this.nameRoom.trim());
    this.nameRoom = "";
    // this.isShowing = false;
  }

  joinHandler() {
    this._joinGroupService.runService(this.nameJoinRoom.trim());
    this.nameJoinRoom = "";
  }

  selectMessage(contact: Contact) {
    console.log(contact)
    resetPagination();
    ContactTo.contactTo.next(contact);
  }


}
