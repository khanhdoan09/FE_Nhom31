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
import {IContentChat} from "../../../../model/content-chat";
import {isHasMoreData} from "../../../../model/pagination";

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss'],
  providers: [AppComponent]
})
export class ContentChatComponent implements OnInit {

  // for load old message
  // get from chat component

  @Input() contentChatService!:IContentChat
  constructor( public cd: ChangeDetectorRef) {
  }


  @HostListener('scroll', ['$event'])

  ngOnInit(): void {
    this.contentChatService.cd = this.cd
  }
}
