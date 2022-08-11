import {Component, ElementRef, EventEmitter, Injectable, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {AnotherTestConnectService} from "../../../../service/api/anotherTestConnectService";
import {AppComponent} from "../../../../app.component";
import {InputChatService} from "../../../../service/home/chat/input-chat/input-chat.service";
import {EmojiSearch} from "@ctrl/ngx-emoji-mart";
import { HttpClient } from '@angular/common/http';
import {Gif} from "../../../../model/pagination";

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
  gifs:Gif[] = [];
  isShowGif:boolean = false

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


  addEmoji(event:any) {
    // not display input gif
    this.isShowGif = false
    // emoji
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;
  }

  changeInput() {
    this.isShowGif = false
    // scroll ve bottom
    this.setScrollToBottomEvent.emit(0)
  }

  onFocus() {
    this.isShowGif = false;
    this.showEmojiPicker = false;
    // scroll ve bottom
    this.setScrollToBottomEvent.emit(0)
  }
  onBlur() {
    this.isShowGif = false;
    this.showEmojiPicker = false;
  }

  onSubmit(form: NgForm): void {
    this.isShowGif = false
    if (this.message != '') {
      this.showEmojiPicker = false;
      this.inputChatService.submitMessage(encodeURI(this.message))
      // reset
      this.message = ""
      this.inputMessage.nativeElement.value = ""
    }
  }

  searchGif(searchTerm: any): void {
    var apiLink = "https://g.tenor.com/v1/search?q="+searchTerm.value+"&key=LIVDSRZULELA&limit=8";
    this.http.get<any>(apiLink).subscribe(data => {
      this.gifs = data.results;
    })
  }

  changeShowGif() {
    this.isShowGif = !this.isShowGif
    if (this.isShowGif) {
      // tenor api
      var apiLink = "https://g.tenor.com/v1/trending?key=LIVDSRZULELA";
      this.http.get<any>(apiLink).subscribe(data => {
        this.gifs = data.results;
      })
    }
  }

  sendGif(url: string) {
    this.isShowGif = false
    console.log(url)
    if (url != '') {
      this.inputChatService.submitMessage(encodeURI(url))
    }
  }
}

