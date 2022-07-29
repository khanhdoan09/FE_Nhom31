import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MessageApi} from "../../../../model/message_api";
import {Api} from "../../../../service/api/api";
import {AppComponent} from "../../../../app.component";
import {TestConnectService} from "../../../../service/api/testConnectService";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {Subject} from "rxjs";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";
import { DatePipe } from '@angular/common';
import {ContactTo} from "../../../../model/contact-to";
import {User} from "../../../../model/user";
import {ContentChatService} from "../../../../service/home/chat/content-chat/content-chat.service";
import {OldContentChatService} from "../../../../service/home/chat/old-content-chat/old-content-chat.service";

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss'],
  providers: [AppComponent]
})
export class ContentChatComponent implements OnInit {

  // for load old message
  // get from chat component

  constructor(public contentChatService: ContentChatService, public oldContentChatService: OldContentChatService, public cd: ChangeDetectorRef) {
    this.contentChatService.cd = cd
  }

  @HostListener('scroll', ['$event'])

  ngOnInit(): void {

  }
}
