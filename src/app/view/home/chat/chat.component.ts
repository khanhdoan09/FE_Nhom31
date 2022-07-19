import { Component, OnInit } from '@angular/core';
import {Api} from "../../../service/api/api";
import {ConnectService} from "../../../service/api/connectService";
import {WebSocketService} from "../../../service/websocket/websocket_service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  // test connection api
  constructor() {
  }


  isActive = true;
  ngOnInit() {
  }
}
