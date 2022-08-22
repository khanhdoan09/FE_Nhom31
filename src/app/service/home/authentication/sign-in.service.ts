import {Injectable} from '@angular/core';
import {Api} from "../../api/api";
import {Router} from "@angular/router";
import {ContactTo, CurrentUser, IdSetInterval} from "../../../model/contact-to";
import {ChatsSidebarService} from "../sidebar/chats-sidebar/chats-sidebar.service";
import {ConnectApi} from "../../websocket/connect-api";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  secretKey = "SecretKeyForEncryption&Descryption";
  cookieValueUsername!: any;
  cookieValuePassword!: any;
  decryptUsername!: any;
  decryptPassword!: any;
  constructor(private router: Router, private connect: ConnectApi, private chatSidebarService: ChatsSidebarService, private afStorage: AngularFireStorage) {

  }

  checkSignInWithCookie() {
    this.cookieValueUsername = document.cookie.split('; ').find(x => x.startsWith('username='))?.split('=')[1];
    this.cookieValuePassword = document.cookie.split('; ').find(x => x.startsWith('password='))?.split('=')[1];
    if (this.cookieValueUsername && this.cookieValuePassword) {
      this.decryptUsername = this.decrypt(this.cookieValueUsername);
      this.decryptPassword = this.decrypt(this.cookieValuePassword);
      this.connect.subject?.next(Api.login(this.decryptUsername, this.decryptPassword));
      this.connect.subject?.subscribe(msg => {
        if (msg.status === 'success') {
          this.signInSuccessfully(this.decryptUsername);
        }
      });
    }
  }

  submitSignIn(username: string, password: string) {
    // first invoke observable by subscribe function
    this.connect.subject?.subscribe(msg => {

      if (msg.status === 'success') {
        this.signInSuccessfully(username);
        let encryptedUsername = this.encrypt(username);
        let encryptedPassword = this.encrypt(password);
        // 1 Day = 24 Hrs = 24*60*60 = 86400.
        // 321408000 = 10 year
        document.cookie = `username=${encryptedUsername}; secure; max-age=321408000`;
        document.cookie = `password=${encryptedPassword}; secure; max-age=321408000`;
      } else {
        alert("Lỗi")
      }
    });
    // second send signal next then observable will catch it
      this.connect.subject?.next(Api.login(username, password));
  }

  signInSuccessfully(username: string) {
    ContactTo.isLogin = true;
    CurrentUser.username = username
    this.router.navigate(['/home']);
    this.getUrlImageFromFirebase();
    this.chatSidebarService.runService();
  }



  getUrlImageFromFirebase() {
    let storageRef = this.afStorage.storage.ref().child("avatar/" +  CurrentUser.username);
    return storageRef.getDownloadURL().then(urlFB => {
      CurrentUser.subject.next(urlFB);
    }, ()=>{
      CurrentUser.subject.next('https://www.w3schools.com/howto/img_avatar.png');
    });
  }

  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
