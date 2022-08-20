import { Component, OnInit } from '@angular/core';
import {MessageApi} from "../../../../model/message_api";
import {ArrayAvatar, Contact, ContactTo} from "../../../../model/contact-to";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  isActive = true
  userName!:string
  avatar!:string

  constructor(private afStorage: AngularFireStorage) {
      ContactTo.contactTo.subscribe((contact:Contact)=>{
        this.userName = contact.name;
        let url =  ArrayAvatar.avatar.get(this.userName);
        if (url == undefined) {
          this.avatar = 'https://www.w3schools.com/howto/img_avatar.png';
        }
        else {
          this.avatar =url;
        }
      })
  }

  ngOnInit(): void {
  }


}
