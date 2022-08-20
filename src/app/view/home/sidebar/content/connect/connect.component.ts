import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Api} from "../../../../../service/api/api";
import {Subject} from "rxjs";
import {MessageApi} from "../../../../../model/message_api";
import {configure} from "../../../../../configure/Configure";
import {map} from "rxjs/operators";
import {WebSocketService} from "../../../../../service/websocket/websocket_service";

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  userNameConnect: string ="";
  connectForm!: FormGroup;
  public anotherconnect!: Subject<any>;

  public create() {
    this.anotherconnect = <Subject<MessageApi>>this.ws.connect(configure.CHAT_URL).pipe(map(
      (response: MessageEvent): MessageApi => {
        let data = JSON.parse(response.data);
        return {
          status: data.status,
          data: data.data,
          mes: data.mes,
          event: data.event
        };
      }
    ));
  }
  constructor(private formBuilder: FormBuilder,private ws: WebSocketService) {
    this.connectForm = this.formBuilder.group( {
      userNameConnect: ['',[Validators.required]]
    })
    this.create();
  }

  ngOnInit(): void {
  }
  get f() {
   return this.connectForm.controls
  }
  connect() {
    alert(this.userNameConnect.trim())
    this.anotherconnect.next(Api.sendMessage(this.userNameConnect.trim(), "connect"));
    this.anotherconnect.subscribe(msg => {
      console.log('aaa:'+ msg)
      console.log(msg)
    });
    this.userNameConnect ="";
  }
}
