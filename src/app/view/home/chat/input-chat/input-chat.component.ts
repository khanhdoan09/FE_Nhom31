import {Component, ElementRef, EventEmitter, Injectable, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {AnotherTestConnectService} from "../../../../service/api/anotherTestConnectService";
import {AppComponent} from "../../../../app.component";
import {InputChatService} from "../../../../service/home/chat/input-chat/input-chat.service";
import {EmojiSearch} from "@ctrl/ngx-emoji-mart";
import {ChatComponent} from "../chat.component";

@Injectable()
@Component({
  selector: 'app-input-chat',
  templateUrl: './input-chat.component.html',
  styleUrls: ['./input-chat.component.scss'],
  providers: [WebSocketService, AnotherTestConnectService, AppComponent]
})
export class InputChatComponent implements OnInit {
  @Output() setScrollToBottomEvent = new EventEmitter();

  @ViewChild('inputMessage') inputMessage!: ElementRef<HTMLInputElement>;

  constructor(private inputChatService: InputChatService) {
  }

  ngOnInit(): void {
  }

  emojiSearch!: EmojiSearch
  name = 'Angular';
  message = '';
  showEmojiPicker = false;
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }


  addEmoji(event:any) {
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;
  }

  changeInput() {
    // scroll ve bottom
    this.setScrollToBottomEvent.emit(0)
  }

  onFocus() {
    this.showEmojiPicker = false;
    // scroll ve bottom
    this.setScrollToBottomEvent.emit(0)
  }
  onBlur() {
    this.showEmojiPicker = false;
  }

  onSubmit(form: NgForm): void {
    if (this.message != '') {
      this.showEmojiPicker = false;
      this.inputChatService.submitMessage(encodeURI(this.message))
      // reset
      this.message = ""
      this.inputMessage.nativeElement.value = ""
    }
  }
}
