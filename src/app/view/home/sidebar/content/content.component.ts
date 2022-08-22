import {Component, OnInit} from '@angular/core';
import { LanguageService } from 'src/app/service/home/language/language.service';
import {ChatsSidebarService} from "../../../../service/home/sidebar/chats-sidebar/chats-sidebar.service";
import {ProfileService} from "../../../../service/home/sidebar/profile-sidebar/profile.service";
import {GroupsService} from "../../../../service/home/sidebar/groups-sideabar/groups.service";
import {IdSetInterval} from "../../../../model/contact-to";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(public _languageService: LanguageService, private chatSidebarService: ChatsSidebarService, private profileService: ProfileService, private _groupsService: GroupsService) {
  }

  ngOnInit(): void {
  }

  status: any = "chats"

  tabsChange(status: any) {
    this.status = status
    if (this.status === 'chats') {
      IdSetInterval.clearAllIntervalInSideBar()
      this.chatSidebarService.runService();
    }
    else if (this.status === 'profile') {
      IdSetInterval.clearAllIntervalInSideBar()
      let userName = localStorage.getItem("userName") || "";
      this.profileService.runService(userName);
    }
    else if (this.status === 'groups') {
      IdSetInterval.clearAllIntervalInSideBar()
      this._groupsService.runService();
    }
    else if (this.status === 'setting') {
      IdSetInterval.clearAllIntervalInSideBar()
    }
  }
}
