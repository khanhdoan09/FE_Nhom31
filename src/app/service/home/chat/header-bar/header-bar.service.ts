import { Injectable } from '@angular/core';
import {Contact, ContactTo, IdSetInterval} from "../../../../model/contact-to";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ConnectApi} from "../../../websocket/connect-api";
import {Api} from "../../../api/api";

@Injectable({
  providedIn: 'root'
})
export class HeaderBarService {

  userName!: string;
  avatar!: string;
  isActive!: any;
  constructor(private afStorage: AngularFireStorage, private connect: ConnectApi) { }

  runService() {
      ContactTo.contactTo.subscribe((contact:Contact)=>{
      this.userName = decodeURI(contact.name);
    })
  }

  checkStatus() {
    this.connect.subject?.subscribe(msg => {
      if (msg.event === 'CHECK_USER') {
        this.isActive = msg.data.status;
      }
    });
    this.connect.subject?.next(Api.checkStatus(this.userName));
  }

  getUrlImageFromFirebase(contactToUsername: string) {
    let storageRef = this.afStorage.storage.ref().child("avatar/" + contactToUsername);
    return storageRef.getDownloadURL().then(urlFB => {
      if (urlFB.includes(`%2F${contactToUsername}?alt`)) {
        console.log(urlFB)
        this.avatar = urlFB;
      }
    }, ()=>{
      this.avatar = 'https://www.w3schools.com/howto/img_avatar.png';
    });
  }
}
