import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {Api} from "../../../../service/api/api";
import {AnotherTestConnectService} from "../../../../service/api/anotherTestConnectService";
import {AppComponent} from "../../../../app.component";
import {TestConnectService} from "../../../../service/api/testConnectService";
import {InputChatService} from "../../../../service/home/chat/input-chat/input-chat.service";

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
  
  user = {
    text: "",
  }

  onSubmit(form: NgForm): void {
    this.inputChatService.submitMessage(this.user.text)
    this.user.text = ""
  }
}
