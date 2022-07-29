import {ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {pagination, updatePagination} from "../../../model/pagination";
import {ContentChatService, idSetInterval} from "../../../service/home/chat/content-chat/content-chat.service";
import {OldContentChatService} from "../../../service/home/chat/old-content-chat/old-content-chat.service";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})


export class ChatComponent implements OnInit {


  @ViewChild('content') content!: ElementRef;

  constructor(public oldContentChatService: OldContentChatService, public cd: ChangeDetectorRef) {
    this.oldContentChatService.cd = cd
  }

  positionScroll:any = null

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    this.positionScroll = event.target
    let currentScrollPosition = event.target.offsetHeight + (-event.target.scrollTop + 1)
    if (currentScrollPosition >= event.target.scrollHeight) {
      clearInterval(idSetInterval)
      updatePagination()
      this.oldContentChatService.updateMessage()
    }
  }

  setScrollToBottom() {
    if(this.positionScroll != null) {
      this.positionScroll.scrollTop = 0
    }
  }

  ngOnInit() {
  }

}
