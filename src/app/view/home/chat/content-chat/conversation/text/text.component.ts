import {Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  http: HttpClient
  constructor(private afStorage: AngularFireStorage, http: HttpClient) {
    this.http=http
  }
  // css
  @Input() flex_direction: string= "";
  @Input() left: string= "";
  @Input() right: string= "";
  @Input() bg_color: string= "";
  @Input() color_text: string= "";
  @Input() color_time: string= "";

  // data
  @Input() text: string = "";
  @Input() time: string = "";

  colons='';
  nameFile:any='';

  arrText:string[] = []

  ngOnInit(): void {
    this.text = decodeURI(this.text)
    // is file
    // trong trường hợp tên file có khoảng trắng nên mới tách ra if else dưới
    if (this.checkIsFile(this.text)) {
      this.arrText = [this.text]
    } else {
      this.arrText = this.text.split(/((?<=[\bhttp::\/\/\w+]\s+))/ig)
    }
  }

  checkIsLink(text: string): boolean {
    let regexp = new RegExp(/\bhttp[s]?:\/\/\S+/ig)
    // link but not link gif
    return regexp.test(text) && !text.trim().endsWith(".gif")
  }

  checkIsGif(text: string): boolean {
    text = text.trim()
    if (text.startsWith("http") && text.endsWith(".gif")) {
      return true
    }
    return false;
  }

  checkIsImage(text: string): boolean {
    text = text.trim()
    if (text.startsWith("https://firebasestorage.googleapis.com/v0/b/chk2-app-chat.appspot.com/o/firebase") && text.endsWith("_type-file:image")) {
      return true;
    }
    return false;
  }

  checkIsFile(text:string) {
    text = text.trim()
    if (text.startsWith("firebase_upload_") && text.includes("_upload_")){
      return true;
    }
      return false;
  }

  getFileName(text: string):string {
    return text.substring(text.lastIndexOf("/")+1)
  }

  checkIsImageExist(url: string) {
    var image = new Image();
    var url_image = url;
    image.src = url_image;
    if (image.width == 0) {
      return false;
    } else {
      return true;
    }
  }



  checkExtension(text: string): string {
    let extension = text.substring(text.lastIndexOf(".")).trim();
    if (extension === '.csv' || extension === '.xlsx' || extension === '.ods') {
      return 'excel';
    }
    else if (extension === '.docx' || extension === '.doc') {
      return 'word';
    }
    else if (extension === '.pptx' || extension === '.ppt') {
      return 'powerpoint'
    }
    else if (extension === '.pdf') {
      return 'pdf'
    }
    else if (extension === '.zip' || extension === '.rar') {
      return 'rar'
    }
    else if (extension === '.mp3' || extension === '.mp4' || extension === '.wav') {
      return 'music'
    }
    else if (extension === '.txt') {
      return 'text'
    }
    else if (extension === '.html' || extension === '.css' || extension === '.js' || extension === '.scss') {
      return 'code'
    }
    else if (extension === '.sql' || extension === '.mysql' || extension === '.accdb') {
      return 'database'
    }
    return 'undefined';
  }

  downloadFile(url: string) {
    let storageRef = this.afStorage.storage.ref().child(url);
    return storageRef.getDownloadURL().then(urlFB =>{
      this.setNameFileDownload(urlFB)
    }, ()=>{
      alert('file not exist')
    });
  }

  checkFileIsExist(url: string) {
    let storageRef = this.afStorage.storage.ref().child(url);
    return storageRef.getDownloadURL().then(urlFB =>{
      return true;
    }, ()=>{
        return false;
    });
  }

  setNameFileDownload(url: string) {
    var anchor = document.createElement("a");
    anchor.download = "test.csv";
    anchor.href = url;
    anchor.click();
  }





  isDeleted: boolean = false;
  deleteText(event: MouseEvent): void {
    this.isDeleted = true
  }

  statusTime = 'none';
  checkActiveTime() {
    if (this.statusTime == 'block') {
      this.statusTime = 'none'
    }
    else {
      this.statusTime = 'block'
    }
  }

}
