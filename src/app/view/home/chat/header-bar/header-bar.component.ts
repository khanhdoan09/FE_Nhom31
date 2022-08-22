import { Component, OnInit } from '@angular/core';
import {ArrayAvatar, Contact, ContactTo, CurrentUser, IdSetInterval} from "../../../../model/contact-to";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Api} from "../../../../service/api/api";
import {ConnectApi} from "../../../../service/websocket/connect-api";
import {HeaderBarService} from "../../../../service/home/chat/header-bar/header-bar.service";

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {


  constructor(private afStorage: AngularFireStorage, private connect: ConnectApi, public headerBarService: HeaderBarService) {
    this.headerBarService.runService();
  }


  ngOnInit(): void {
  }


}
