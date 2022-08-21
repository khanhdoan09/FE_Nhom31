import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Api} from "../../../../../service/api/api";
import {ConnectApi} from "../../../../../service/websocket/connect-api";
import {CurrentUser} from "../../../../../model/contact-to";

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  userNameConnect: string ="";
  connectForm!: FormGroup;

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
    this.connect.subject?.next(Api.sendMessage(this.userNameConnect, '<< system connect from '+ CurrentUser.username +  ' to ' + this.userNameConnect + ' >>'));
    alert('done');
    this.connectForm.reset();
  }
}
