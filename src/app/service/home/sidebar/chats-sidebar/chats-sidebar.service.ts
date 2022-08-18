import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {Contact, ContactTo} from "../../../../model/contact-to";
import {resetPagination} from "../../../../model/pagination";
import {set} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class ChatsSidebarService {

  public userList: Array<any> = [];
  txtSearch: any;
  test: any = true;
  time: string = "";

  constructor(private _testConnectService: TestConnectService, private afStorage: AngularFireStorage) {
  }

  runService() {

    this.updateUser();

  }

  init = () => {
    // wait for login

    // first invoke observable by subscribe function
    this._testConnectService.messages.subscribe(msg => {
      this.renderListUser(msg);
      this.checkStatusUser(msg)
      this.getAvatarUser(msg);
    });

    // second send signal next then observable will catch it
    this._testConnectService.messages.next(Api.loadUserList());


  }

  updateUser() {
    this.init();
  }

  renderListUser(msg: any) {
    this.userList = msg.data;

    return this.userList;
  }


  checkStatusUser(msg: any) {
    setInterval(() => {
      this.checkStatusOneUser(msg.data, 0)
    }, 2500)
  }

  checkStatusOneUser(arrUser: any, index: number) {

    if (index != arrUser.length) {
      this._testConnectService.messages.subscribe(msg => {
        if (msg.data != null || msg.data != undefined) {
          if (arrUser[index].type === 0) {
            arrUser[index].status = msg.data.status;
            // console.log(arrUser[index].name + '~' + msg.data.status);
            // console.log(arrUser);
          }
        } else {
          arrUser[index].status = false;
        }
        this.checkStatusOneUser(arrUser, index + 1)
      });
      this._testConnectService.messages.next(Api.get_user_list(arrUser[index].name));
    } else {
      return
    }
  }

  getAvatarUser(msg: any) {
    setInterval(() => {
      this.getOneAvatar(msg.data, 0)
    }, 2500)
  }

  getOneAvatar(arrUser: any, index: number) {
    try {
      if (index != arrUser.length) {
        if (arrUser[index].type === 0) {
          let storageRef = this.afStorage.storage.ref().child("avatar/" + arrUser[index].name);
          storageRef.getDownloadURL().then(urlFB => {
              this.getOneAvatar(arrUser, index + 1)
              arrUser[index].src = urlFB

            },
            // () => {
            //   arrUser[index].src = 'https://www.w3schools.com/howto/img_avatar.png';
            //   this.getOneAvatar(arrUser, index + 1)
            // }
          ).catch((error) => {
            arrUser[index].src = 'https://www.w3schools.com/howto/img_avatar.png';
            this.getOneAvatar(arrUser, index + 1);
          })

        }
      } else {

        return;
      }
    } catch (e) {

    }
  }


  selectMessage(contact: Contact) {
    resetPagination()
    ContactTo.contactTo.next(contact);
  }
}
