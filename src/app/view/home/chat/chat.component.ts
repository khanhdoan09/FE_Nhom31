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

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    let currentScrollPosition = event.target.offsetHeight + (-event.target.scrollTop + 1)
    if (currentScrollPosition >= event.target.scrollHeight) {
      // console.log('end')
      // console.log(pagination)
      // console.log('cur ' + currentScrollPosition)

      clearInterval(idSetInterval)
      updatePagination()
      this.oldContentChatService.updateMessage()

      // console.log('new '+ pagination)
      // currentScrollPosition = 0
      // console.log(currentScrollPosition)
    }
  }

  ngOnInit() {
  }

}
