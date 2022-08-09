import {ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {isHasMoreData, pagination, updatePagination} from "../../../model/pagination";
import {ContentChatService, idSetInterval} from "../../../service/home/chat/content-chat/content-chat.service";
import {OldContentChatService} from "../../../service/home/chat/old-content-chat/old-content-chat.service";
import {Spinner} from "../../../model/spinner";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})


export class ChatComponent implements OnInit {


  @ViewChild('content') content!: ElementRef;

  constructor(public oldContentChatService: OldContentChatService, public contentChatService: ContentChatService) {

  }

  spinner = Spinner
  positionScroll:any = null

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (isHasMoreData) {
      this.positionScroll = event.target
      let currentScrollPosition = event.target.offsetHeight + (-event.target.scrollTop + 1)
      if (currentScrollPosition >= event.target.scrollHeight) {
        setTimeout(()=>{
          Spinner.changeShow(true)
        }, 500)
        clearInterval(idSetInterval)
        updatePagination()
        setTimeout(()=>{
          this.oldContentChatService.updateMessage()
        },1500)
      }
    }
    else {
      Spinner.changeShow(false)
    }
  }

  setScrollToBottom() {
    if(this.positionScroll != null) {
      this.positionScroll.scrollTop = 0
    }
  }

  getIsHasMoreData() {
    return isHasMoreData
  }

  ngOnInit() {
  }

}
