import {Injectable} from '@angular/core';
import {Api} from "../../../api/api";
import {ArrayAvatar, Contact, ContactTo, IdSetInterval} from "../../../../model/contact-to";
import {resetPagination} from "../../../../model/pagination";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { resetArrayContainFile } from 'src/app/model/file';
import {ContentChatService, idSetInterval} from "../../chat/content-chat/content-chat.service";
import {ConnectApi} from "../../../websocket/connect-api";
import {ChatComponent} from "../../../../view/home/chat/chat.component";
import {HeaderBarService} from "../../chat/header-bar/header-bar.service";
import {Spinner} from "../../../../model/spinner";

@Injectable({
  providedIn: 'root'
})
export class ChatsSidebarService {

  public userList: Array<any> = [];
  txtSearch: any;
  test: any = true;
  time: string = "";

  constructor(private afStorage: AngularFireStorage,  private connect: ConnectApi, private contentChatService: ContentChatService, private headerBarService: HeaderBarService) {
  }

  runService() {

    this.updateUser();

  }

  init = () => {
    // first invoke observable by subscribe function
    this.connect.subject?.subscribe(msg => {
      if (msg.event != 'GET_USER_LIST') {
        this.updateUser();
      }
      else {
        this.renderListUser(msg);
        this.checkStatusUser(msg)
        this.getAvatarUser(msg);
      }
    });

    // second send signal next then observable will catch it
    this.connect.subject?.next(Api.loadUserList());


  }

  updateUser() {
    this.init();
  }

  renderListUser(msg: any) {
    this.userList = msg.data;
    return this.userList;
  }


  checkStatusUser(msg: any) {
    this.checkStatusOneUser(msg.data, 0)
    IdSetInterval.idSetIntervalStatus = setInterval(() => {
      this.checkStatusOneUser(msg.data, 0)
    }, 2500)
  }

  checkStatusOneUser(arrUser: any, index: number) {
    if (index != arrUser.length) {
      if (arrUser[index].type==1) {
        this.checkStatusOneUser(arrUser, index + 1);
      }
      else {
        this.connect.subject?.next(Api.checkStatus(arrUser[index].name));
        this.connect.subject?.subscribe(msg => {
          if ( msg.event != 'CHECK_USER') {
            this.checkStatusOneUser(arrUser, index)
          }
          else {
            arrUser[index].status = msg.data.status;
            if (arrUser[index].name === this.headerBarService.userName) {
              this.headerBarService.isActive = arrUser[index].status;
            }
            this.checkStatusOneUser(arrUser, index + 1)
          }
        });
      }
    } else {
      return
    }
  }

  getAvatarUser(msg: any) {
    IdSetInterval.idSetIntervalAvatar = setInterval(()=>{
      this.getOneAvatar(msg.data, 0)
    }, 1000)
  }

  getOneAvatar(arrUser: any, index: number) {
    if (index != arrUser.length) {
        for (let i = 0; i < arrUser.length; i++) {
          if (arrUser[i].type==1) {
              continue
          }
          else {
            let storageRef = this.afStorage.storage.ref().child("avatar/" + arrUser[i].name);
            storageRef.getDownloadURL().then(urlFB => {
              // this.getOneAvatar(arrUser, index + 1)
              arrUser[i].src = urlFB
              ArrayAvatar.avatar.set(arrUser[i].name, urlFB)
              if (urlFB.includes(`%2F${this.headerBarService.userName}?alt`)) {
                this.headerBarService.avatar=urlFB;
              }
            }, (e)=>{
              arrUser[i].src = 'https://www.w3schools.com/howto/img_avatar.png'
              ArrayAvatar.avatar.set(arrUser[i].name, 'https://www.w3schools.com/howto/img_avatar.png')
            })
          }
        }
    } else {
      return
    }
  }

  selectMessage(contact: Contact) {
    resetPagination();
    resetArrayContainFile();
    if (IdSetInterval.idSetIntervalMessage) {
      clearInterval(IdSetInterval.idSetIntervalMessage)
    }
    if (idSetInterval.idSetIntervalGroup) {
      clearInterval(IdSetInterval.idSetIntervalGroup)
    }
    let element: any = document.getElementById("container_scroll");
    element.scrollTop = element.scrollHeight
    Spinner.isShow = false;
    this.contentChatService.runService();
    ContactTo.contactTo.next(contact);
  }
}
