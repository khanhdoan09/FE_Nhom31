import {Component, OnInit} from '@angular/core';
import {Api} from "../../../../../service/api/api";
import {TestConnectService} from "../../../../../service/api/testConnectService";
import {ContactTo} from "../../../../../model/contact-to";
import {User} from "../../../../../model/user";
import {ChatsSidebarService} from "../../../../../service/home/sidebar/chats-sidebar/chats-sidebar.service";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor(public chatSidebarService: ChatsSidebarService) {
    this.chatSidebarService.runService()
  }

  ngOnInit(): void {

  }


}
