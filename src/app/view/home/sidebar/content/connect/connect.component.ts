import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Api} from "../../../../../service/api/api";
import {ConnectApi} from "../../../../../service/websocket/connect-api";
import {CurrentUser} from "../../../../../model/contact-to";
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

  constructor(private formBuilder: FormBuilder, private connect: ConnectApi) {
    this.connectForm = this.formBuilder.group( {
      userNameConnect: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  get f() {
   return this.connectForm.controls
  }

  connectToUser() {
    this.connect.subject?.next(Api.sendMessage(this.userNameConnect, ''));
    alert('done');
    this.connectForm.reset();

  }
}
