import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {AnotherTestConnectService} from "../../../../service/api/anotherTestConnectService";
import {AppComponent} from "../../../../app.component";
import {InputChatService} from "../../../../service/home/chat/input-chat/input-chat.service";
import {EmojiSearch} from "@ctrl/ngx-emoji-mart";


declare const microlink:any;

@Component({
  selector: 'app-input-chat',
  templateUrl: './input-chat.component.html',
  styleUrls: ['./input-chat.component.scss'],
  providers: [WebSocketService, AnotherTestConnectService, AppComponent]
})
export class InputChatComponent implements OnInit {

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

  onFocus() {
    this.showEmojiPicker = false;
  }
  onBlur() {
    this.showEmojiPicker = false;
  }

  onSubmit(form: NgForm): void {
    this.showEmojiPicker = false;
    this.inputChatService.submitMessage(encodeURI(this.message))
    // reset
    this.message = ""
  }
}
