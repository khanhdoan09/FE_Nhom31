import {Component, OnInit} from '@angular/core';
import {ChatsSidebarService} from "../../../../../service/home/sidebar/chats-sidebar/chats-sidebar.service";
import {ProfileService} from 'src/app/service/home/sidebar/profile-sidebar/profile.service';
import {LanguageService} from "../../../../../service/home/language/language.service";
import {OldContentChatService} from "../../../../../service/home/chat/old-content-chat/old-content-chat.service";
import {Contact} from "../../../../../model/contact-to";
import {InputChatComponent} from "../../../chat/input-chat/input-chat.component";
import {ContentChatService} from "../../../../../service/home/chat/content-chat/content-chat.service";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor(public chatSidebarService: ChatsSidebarService,
              public _profileService: ProfileService,
              public _languageService: LanguageService,
              private oldContentChatService: OldContentChatService,
              private contentChatService: ContentChatService) {
  }


  ngOnInit(): void {

  }

  selectMessage(contact: Contact) {
    this.oldContentChatService.messages = [];
    this.chatSidebarService.selectMessage(contact);
  }


}
