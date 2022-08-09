import {Component, ElementRef, EventEmitter, Injectable, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {AnotherTestConnectService} from "../../../../service/api/anotherTestConnectService";
import {AppComponent} from "../../../../app.component";
import {InputChatService} from "../../../../service/home/chat/input-chat/input-chat.service";
import {EmojiSearch} from "@ctrl/ngx-emoji-mart";
import { HttpClient } from '@angular/common/http';

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

  title = "Welcome to GiphySearch";
  http: HttpClient;
  giphies = [];

  constructor(private inputChatService: InputChatService, http: HttpClient) {
    this.http = http;

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

  performSearch(searchTerm: HTMLInputElement): void {
    var apiLink = "https://g.tenor.com/v1/search?q="+searchTerm.value+"&key=LIVDSRZULELA&limit=8";
    this.http.get<any>(apiLink).subscribe(data => {
        this.giphies = data;
        console.log(this.giphies);
    })
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
