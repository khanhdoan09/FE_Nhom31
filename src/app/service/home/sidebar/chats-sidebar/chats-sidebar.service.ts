import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {ArrayAvatar, Contact, ContactTo} from "../../../../model/contact-to";
import {resetPagination} from "../../../../model/pagination";
import {set} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {WebSocketService} from "../../../websocket/websocket_service";
import {Subject} from "rxjs";
import {MessageApi} from "../../../../model/message_api";
import {configure} from "../../../../configure/Configure";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatsSidebarService {

  public userList: Array<any> = [];
  txtSearch: any;
  test: any = true;
  time: string = "";
  public connect!: Subject<any>;

  constructor(private afStorage: AngularFireStorage,private ws: WebSocketService) {
    this.create()
  }

  public create() {
    this.connect = <Subject<MessageApi>>this.ws.connect(configure.CHAT_URL).pipe(map(
      (response: MessageEvent): MessageApi => {
        let data = JSON.parse(response.data);
        return {
          status: data.status,
          data: data.data,
          mes: data.mes,
          event: data.event
        };
      }
    ));
  }

  runService() {

    this.updateUser();

  }

  init = () => {
    // wait for login

    // first invoke observable by subscribe function
    this.connect.subscribe(msg => {
      console.log(msg)
      this.renderListUser(msg);
      this.checkStatusUser(msg)
      this.getAvatarUser(msg);
    });

    // second send signal next then observable will catch it
    this.connect.next(Api.loadUserList());


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
    setInterval(() => {
      this.checkStatusOneUser(msg.data, 0)
    }, 2500)
  }

  checkStatusOneUser(arrUser: any, index: number) {
    if (index != arrUser.length) {
      if (arrUser[index].type==1) {
        this.checkStatusOneUser(arrUser, index + 1)
      }
      else {
        this.connect.next(Api.get_user_list(arrUser[index].name));
        this.connect.subscribe(msg => {
          if ( msg.event != 'CHECK_USER') {
            this.checkStatusOneUser(arrUser, index)
          }
          else {
            arrUser[index].status = msg.data.status;
            this.checkStatusOneUser(arrUser, index + 1)
          }
        });
      }
    } else {
      return
    }
  }

  getAvatarUser(msg: any) {
    setInterval(()=>{
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
    resetPagination()
    ContactTo.contactTo.next(contact);
  }
}
