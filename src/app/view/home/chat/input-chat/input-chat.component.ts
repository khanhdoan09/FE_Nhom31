import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {AnotherTestConnectService} from "../../../../service/api/anotherTestConnectService";
import {AppComponent} from "../../../../app.component";
import {InputChatService} from "../../../../service/home/chat/input-chat/input-chat.service";
import {EmojiSearch, EmojiFrequentlyService} from "@ctrl/ngx-emoji-mart";


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
  messageNotRenderIcon = ''
  message = '';
  showEmojiPicker = false;
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  curText = ''
  modelChanged(newObj: any) {
    if (newObj.length == 0) {
      // reset when user remove text input
      this.message = ""
      this.messageNotRenderIcon = ""
      this.curText = ""
    }
    else {
      this.messageNotRenderIcon += newObj.substring(this.curText.length)
      this.curText = newObj
    }
  }

  addEmoji(event:any) {
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.messageNotRenderIcon =`${this.messageNotRenderIcon}{${event.emoji.colons}}`;
    this.curText = text
    this.message = text;
  }

  onFocus() {
    this.showEmojiPicker = false;
  }
  onBlur() {
    this.showEmojiPicker = false;
  }

  onSubmit(form: NgForm): void {
   // this.inputChatService.submitMessage(this.messageNotRenderIcon)
    // reset
    this.message = ""
    this.messageNotRenderIcon = ""
    this.curText = ""
  }
}
