import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {Api} from "../../../../service/api/api";
import {AnotherTestConnectService} from "../../../../service/api/anotherTestConnectService";
import {AppComponent} from "../../../../app.component";
import {TestConnectService} from "../../../../service/api/testConnectService";

@Component({
  selector: 'app-input-chat',
  templateUrl: './input-chat.component.html',
  styleUrls: ['./input-chat.component.scss'],
  providers: [WebSocketService, AnotherTestConnectService, AppComponent]
})
export class InputChatComponent implements OnInit {

  constructor(private connect: TestConnectService) {
  }

  ngOnInit(): void {
  }
  user = {
    text: "",
  }
  onSubmit(form: NgForm): void {
    // first invoke observable by subscribe function
    this.connect.messages.subscribe(msg => {
    });
    // second send signal next then observable will catch it
    setTimeout(()=>{
      this.connect.messages.next(Api.sendMessage("", this.user.text));
      this.user.text = ""
    },100)

  }
}
