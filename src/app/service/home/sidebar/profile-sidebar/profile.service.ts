import {Injectable} from '@angular/core';
import {TestConnectService} from "../../../api/testConnectService";
import {Api} from "../../../api/api";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {CurrentUser} from "../../../../model/contact-to";
import {WebSocketService} from "../../../websocket/websocket_service";
import {MessageApi} from "../../../../model/message_api";
import {configure} from "../../../../configure/Configure";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  statusUser: any;
  userName: any = localStorage.getItem('userName');
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadState!: Observable<any>;
  src: any = "https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg";
  arrayImage: Array<any> = [];
  showMyContainer: boolean = false;
  public connect!: Subject<any>;

  constructor(private afStorage: AngularFireStorage,private ws: WebSocketService) {
    this.create()
    this.getUrlImageFromFirebase();
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

  runService(name: any) {
    this.userName = name;
    this.updateInfoUser();
  }

  init() {
    this.connect.subscribe(msg => {
      this.loadInfoUser(msg);
    });
    this.connect.next(Api.get_user_list(this.userName));
  }

  updateInfoUser() {
    setTimeout(() => {
      this.init();
    }, 50)
  }

  loadInfoUser(msg: any) {
    this.statusUser = msg.data.status;
    return this.statusUser;
  }

  saveAvatar() {
    const id = "avatar/" + CurrentUser.username;
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(this.arrayImage[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map((s: any) => s.state));
    this.uploadState.subscribe((state) => {
      if (state === 'success') {
        alert('done')
      }
    });
    this.showMyContainer = false;
  }

  getUrlImageFromFirebase() {
    this.userName = localStorage.getItem("userName");
    let storageRef = this.afStorage.storage.ref().child("avatar/" +  CurrentUser.username);
    return storageRef.getDownloadURL().then(urlFB => {
      this.src = urlFB;
      CurrentUser.avatar.next(urlFB)
    });

  }

  uploadFile(event: any) {
    // add image to display
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.arrayImage.push(event.target.files[0]);
      this.src = reader.result;
    }

  }

}
