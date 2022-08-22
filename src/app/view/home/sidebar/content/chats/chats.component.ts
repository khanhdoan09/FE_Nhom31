import {Component, OnInit} from '@angular/core';
import {ChatsSidebarService} from "../../../../../service/home/sidebar/chats-sidebar/chats-sidebar.service";
import {ProfileService} from 'src/app/service/home/sidebar/profile-sidebar/profile.service';
import {LanguageService} from "../../../../../service/home/language/language.service";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor(public chatSidebarService: ChatsSidebarService,
              public _profileService: ProfileService,
              public _languageService: LanguageService) {
  }


  ngOnInit(): void {

  }


}
