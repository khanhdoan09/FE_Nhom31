import {Injectable} from '@angular/core';
import {Api} from "../../api/api";
import {Router} from "@angular/router";
import {ContactTo, CurrentUser, IdSetInterval} from "../../../model/contact-to";
import {ChatsSidebarService} from "../sidebar/chats-sidebar/chats-sidebar.service";
import {ConnectApi} from "../../websocket/connect-api";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private router: Router, private connect: ConnectApi, private chatSidebarService: ChatsSidebarService, private afStorage: AngularFireStorage) {

  }

  submitSignIn(username: string, password: string) {
    // first invoke observable by subscribe function
    this.connect.subject?.subscribe(msg => {
      console.log(msg)
      if (msg.status === 'success') {
        ContactTo.isLogin = true;
        CurrentUser.username = username
        this.router.navigate(['/home']);
        this.getUrlImageFromFirebase();
        this.chatSidebarService.runService()
      } else {
        alert("Lỗi")
      }
    });
    // second send signal next then observable will catch it
      this.connect.subject?.next(Api.login(username, password));
  }



  getUrlImageFromFirebase() {
    console.log(CurrentUser.username)
    let storageRef = this.afStorage.storage.ref().child("avatar/" +  CurrentUser.username);
    return storageRef.getDownloadURL().then(urlFB => {
      console.log(urlFB);
      CurrentUser.avatar.next(urlFB)
    });

  }
}
