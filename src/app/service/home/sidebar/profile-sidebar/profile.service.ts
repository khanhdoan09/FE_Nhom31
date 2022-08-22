import {Injectable} from '@angular/core';
import {Api} from "../../../api/api";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {CurrentUser} from "../../../../model/contact-to";
import {ConnectApi} from "../../../websocket/connect-api";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  statusUser: any;
  userName!: string;
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadState!: Observable<any>;
  src: any = "https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg";
  arrayImage: Array<any> = [];
  showMyContainer: boolean = false;

  constructor(private afStorage: AngularFireStorage, private connect: ConnectApi) {
    this.getUrlImageFromFirebase();
  }


  runService(name: any) {
    this.updateInfoUser();
    this.userName = CurrentUser.username;
  }

  init() {
    this.connect.subject?.subscribe(msg => {
      this.loadInfoUser(msg);
    });
    this.connect.subject?.next(Api.checkStatus(this.userName));
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
        console.log(CurrentUser.username)
        this.arrayImage = []
        CurrentUser.subject.next(this.src);
      }
    });
    this.showMyContainer = false;
  }

  getUrlImageFromFirebase() {
    this.userName = CurrentUser.username;
    let storageRef = this.afStorage.storage.ref().child("avatar/" +  CurrentUser.username);
    return storageRef.getDownloadURL().then(urlFB => {
      this.src = urlFB;
      CurrentUser.subject.next(urlFB)
    }, ()=>{
      this.src = 'https://www.w3schools.com/howto/img_avatar.png';
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
