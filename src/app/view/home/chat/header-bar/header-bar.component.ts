import { Component, OnInit } from '@angular/core';
import {ArrayAvatar, Contact, ContactTo, CurrentUser, IdSetInterval} from "../../../../model/contact-to";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Api} from "../../../../service/api/api";
import {ConnectApi} from "../../../../service/websocket/connect-api";

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  isActive = false;
  userName!:string;
  avatar!:string;

  constructor(private afStorage: AngularFireStorage, private connect: ConnectApi) {
      ContactTo.contactTo.subscribe((contact:Contact)=>{
        this.userName = contact.name;
        IdSetInterval.idSetIntervalContactTo = setInterval(()=>{
          this.getUrlImageFromFirebase(this.userName);
          this.checkStatus();
        }, 1500)
      })
  }

  checkStatus() {
    this.connect.subject?.subscribe(msg => {
      this.isActive = msg.data.status;
    });
    this.connect.subject?.next(Api.checkStatus(this.userName));
  }

  getUrlImageFromFirebase(contactToUsername: string) {
    let storageRef = this.afStorage.storage.ref().child("avatar/" + contactToUsername);
    return storageRef.getDownloadURL().then(urlFB => {
      this.avatar = urlFB;
    }, ()=>{
      this.avatar = 'https://www.w3schools.com/howto/howto_css_image_avatar.asp';
    });
  }

  ngOnInit(): void {
  }


}
