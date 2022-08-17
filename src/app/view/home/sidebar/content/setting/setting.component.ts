import {Component, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  userName: any;
  setMode = true;
  src: any = "https://png.pngtree.com/png-vector/20190625/ourlarge/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg";
  src_ver2: any = "";
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadState!: Observable<any>;
  arrayImage: Array<any> = [];


  constructor(private afStorage: AngularFireStorage) {
    this.userName = localStorage.getItem("userName") || "";
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

  saveAvatar() {
    const id = "avatar/" + localStorage.getItem("userName");
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(this.arrayImage[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map((s: any) => s.state));
    this.uploadState.subscribe((state) => {
      if (state === 'success') {
        alert('done')
      }
    })
  }


}
