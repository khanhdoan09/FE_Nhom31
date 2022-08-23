import {Component, OnInit} from '@angular/core';
import {CreateGroupService} from 'src/app/service/home/sidebar/groups-sideabar/create-group.service';
import {JoinGroupService} from 'src/app/service/home/sidebar/groups-sideabar/join-group.service';
import {GroupsService} from "../../../../../service/home/sidebar/groups-sideabar/groups.service";
import {Contact, ContactTo, IdSetInterval} from "../../../../../model/contact-to";

import {resetPagination} from "../../../../../model/pagination";
import {LanguageService} from "../../../../../service/home/language/language.service";
import {resetArrayContainFile} from "../../../../../model/file";
import {ContentChatService, idSetInterval} from "../../../../../service/home/chat/content-chat/content-chat.service";
import {OldContentChatService} from "../../../../../service/home/chat/old-content-chat/old-content-chat.service";
import {HeaderBarService} from "../../../../../service/home/chat/header-bar/header-bar.service";
import {Spinner} from "../../../../../model/spinner";
import {InputChatComponent} from "../../../chat/input-chat/input-chat.component";
import {decode} from "punycode";


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
              private contentChatService: ContentChatService,
              private oldContentChatService: OldContentChatService,
              private headerBarService: HeaderBarService)
  {}

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
    resetPagination();
    resetArrayContainFile();
    if (IdSetInterval.idSetIntervalMessage) {
      clearInterval(IdSetInterval.idSetIntervalMessage)
    }
    if (idSetInterval.idSetIntervalGroup) {
      clearInterval(IdSetInterval.idSetIntervalGroup)
    }
    this.headerBarService.avatar = 'https://www.visualantidote.com/VA/media/VA/Articles/avatarImage.png?ext=.png';
    this.headerBarService.isActive = 'true';
    let element: any = document.getElementById("container_scroll");
    element.scrollTop = element.scrollHeight;
    this.oldContentChatService.messages = [];
    Spinner.isShow = false;
    this.contentChatService.runService();
    ContactTo.contactTo.next(contact);
  }

  closeJoin() {
    this.isShowAddMember = false;
    this._joinGroupService.dataJoin.event = "";
  }

  closeCreate() {
    this.isShowAddMember = false;
    this._createGroupService.dataCreated.event = "";
  }

  renderNameGroup(nameGroup: any) {
    return decodeURI(nameGroup)
  }
}
