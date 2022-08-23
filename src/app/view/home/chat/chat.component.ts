import {
  Component,
  ElementRef,
  HostListener,
  Injectable,
  OnInit,
  ViewChild
} from '@angular/core';
import {isHasMoreData, updatePagination} from "../../../model/pagination";
import {ContentChatService} from "../../../service/home/chat/content-chat/content-chat.service";
import {OldContentChatService} from "../../../service/home/chat/old-content-chat/old-content-chat.service";
import {Spinner} from "../../../model/spinner";
import {File} from "../../../model/file";
import { IdSetInterval} from "../../../model/contact-to";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})


export class ChatComponent implements OnInit {


  @ViewChild('content') content!: ElementRef;

  constructor(public oldContentChatService: OldContentChatService, public contentChatService: ContentChatService) {

  }

  spinner = Spinner;
  positionScroll:any = null;
  files: File[] = [];


  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (isHasMoreData) {
      this.positionScroll = event.target;
      let currentScrollPosition = event.target.offsetHeight + (-event.target.scrollTop + 1);
      if (currentScrollPosition >= event.target.scrollHeight) {
        setTimeout(()=>{
          Spinner.changeShow(true);
        }, 500)
        clearInterval(IdSetInterval.idSetIntervalMessage);
        clearInterval(IdSetInterval.idSetIntervalStatus)
        clearInterval(IdSetInterval.idSetIntervalGroup)
        updatePagination();
        setTimeout(()=>{
          this.oldContentChatService.updateMessage();
        },1000)
      }
    }
    else {
      this.oldContentChatService.noMoreMessage();
      Spinner.changeShow(false)
    }
  }

  setScrollToBottom() {
    if(this.positionScroll != null) {
      this.positionScroll.scrollTop = 0;
    }
  }

  addFile(file: File) {
    this.files.unshift(file);
  }

  resetArrayFile() {
    this.files = [];
  }

  getIsHasMoreData() {
    return isHasMoreData
  }

  checkExtension(file: File): string {
    if (file === undefined) {
      return 'null'
    }
    let extension = file.name.substring(file.name.lastIndexOf(".")).trim();
    if (extension === '.csv' || extension === '.xlsx' || extension === '.ods') {
      return 'excel';
    }
    else if (extension === '.docx' || extension === '.doc') {
      return 'word';
    }
    else if (extension === '.pptx' || extension === '.ppt') {
      return 'powerpoint'
    }
    else if (extension === '.pdf') {
      return 'pdf'
    }
    else if (extension === '.zip' || extension === '.rar') {
      return 'rar'
    }
    else if (extension === '.mp3' || extension === '.mp4' || extension === '.wav') {
      return 'music'
    }
    else if (extension === '.txt') {
      return 'text'
    }
    else if (extension === '.html' || extension === '.css' || extension === '.js' || extension === '.scss') {
      return 'code'
    }
    else if (extension === '.jpg' || extension === '.jpeg' || extension === '.png') {
      return 'image'
    }
    else if (extension === '.sql' || extension === '.mysql' || extension === '.accdb') {
      return 'database'
    }
    else {
      return 'undefined';
    }
  }

  ngOnInit() {
  }

  removeFileBeforeUpload(index: number) {
    delete this.files[index]
  }

}
