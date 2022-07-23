import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Api} from "../../../service/api/api";
import {TestConnectService} from "../../../service/api/testConnectService";
import {WebSocketService} from "../../../service/websocket/websocket_service";
import {AppComponent} from "../../../app.component";
import {MessageApi} from "../../../model/message_api";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @ViewChild('content') content!: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }
}
