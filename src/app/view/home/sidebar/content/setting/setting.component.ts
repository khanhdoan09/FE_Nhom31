import {Component, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ProfileService} from "../../../../../service/home/sidebar/profile-sidebar/profile.service";
import {SignInService} from "../../../../../service/home/authentication/sign-in.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  userName: any;
  setMode = true;
  src: any = null || "https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg";
  src_ver2: any = "";
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadState!: Observable<any>;
  arrayImage: Array<any> = [];
  isShow: any;


  constructor(private afStorage: AngularFireStorage, public profileService: ProfileService , private signInService: SignInService) {
    this.userName = localStorage.getItem("userName") || "";
    this.getUrlImageFromFirebase();

  }

  ngOnInit(): void {
  }

  openAlert() {

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


  getUrlImageFromFirebase() {
    let nameUser: any = localStorage.getItem("userName");
    let storageRef = this.afStorage.storage.ref().child("avatar/" + nameUser);
    return storageRef.getDownloadURL().then(urlFB => {
      this.src = urlFB;
      console.log(this.src)
    });
  }

  handleClick() {
    let fileAvatar: any = document.querySelector("#file-avatar");
    fileAvatar.click();
    let saved: any = document.querySelector("#save-avatar");

    console.log(saved)


      this.profileService.showMyContainer = true;



  }

  logout() {
    this.signInService.logout()
  }
}
