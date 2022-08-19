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
import {ArrayAvatar, CurrentUser} from "../../../../model/contact-to";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss'],
  providers: [AppComponent]
})
export class ContentChatComponent implements OnInit {

  // for load old message
  // get from chat component

  avatar!:string
  @Input() contentChatService!:IContentChat
  constructor( public cd: ChangeDetectorRef, private afStorage: AngularFireStorage) {
    CurrentUser.avatar.subscribe((url:string)=>{
      this.avatar=url
    })
  }

  getOneAvatar(arrUser: any, index: number): string {
    return''
  }

  currentName = CurrentUser.username;

  @HostListener('scroll', ['$event'])

  ngOnInit(): void {
    this.contentChatService.cd = this.cd
  }

  getAvatar(username: string): string {
    let url = ArrayAvatar.avatar.get(username)
    if (url == undefined) {
      return 'https://www.w3schools.com/howto/img_avatar.png'
    }
    else {
      return url
    }
  }

}
