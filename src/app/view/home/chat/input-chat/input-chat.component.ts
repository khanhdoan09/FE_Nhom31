import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {arrText} from "../../../../model/content-chat";
import {TestConnectService} from "../../../../service/api/testConnectService";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {Api} from "../../../../service/api/api";

@Component({
  selector: 'app-input-chat',
  templateUrl: './input-chat.component.html',
  styleUrls: ['./input-chat.component.scss'],
  providers: [WebSocketService, TestConnectService]
})
export class InputChatComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
  }

  user = {
    userName: "mr A",
    text: "",
  }



  onSubmit(form: NgForm): void {
    arrText.push(this.user.text)
    this.user.text = ""
  }

}
