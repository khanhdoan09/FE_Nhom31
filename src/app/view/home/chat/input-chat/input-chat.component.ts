import {Component, ElementRef, EventEmitter, Injectable, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../../../../service/websocket/websocket_service";
import {AnotherTestConnectService} from "../../../../service/api/anotherTestConnectService";
import {AppComponent} from "../../../../app.component";
import {InputChatService} from "../../../../service/home/chat/input-chat/input-chat.service";
import {EmojiSearch} from "@ctrl/ngx-emoji-mart";
import { HttpClient } from '@angular/common/http';
import {Gif} from "../../../../model/pagination";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {
  arrContainAngularFireStorageReference,
  arrSendUrlFile,
  arrSendUrlToFirebase,
  File, resetArrayContainFile
} from "../../../../model/file";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-input-chat',
  templateUrl: './input-chat.component.html',
  styleUrls: ['./input-chat.component.scss'],
  providers: [WebSocketService, AnotherTestConnectService, AppComponent]
})

export class InputChatComponent implements OnInit {
  @Output() setScrollToBottomEvent = new EventEmitter();

  @ViewChild('inputMessage') inputMessage!: ElementRef<HTMLInputElement>;

  title = "Welcome to GiphySearch";
  http: HttpClient;
  gifs: Gif[] = [];
  isShowGif: boolean = false;
  @Output() addFile = new EventEmitter<any>();
  @Output() resetArrayImage = new EventEmitter<any>();



  stateUploadImage!: Observable<any>;
  task!: AngularFireUploadTask;
  ref!: AngularFireStorageReference;

  constructor(private inputChatService: InputChatService, http: HttpClient, private afStorage: AngularFireStorage) {
    this.http = http;
  }

  ngOnInit(): void {
  }

  emojiSearch!: EmojiSearch
  name = 'Angular';
  message = '';
  showEmojiPicker = false;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }


  addEmoji(event: any) {
    // not display input gif
    this.isShowGif = false
    // emoji
    const {message} = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;
  }

  changeInput() {
    this.isShowGif = false
    // scroll ve bottom
    this.setScrollToBottomEvent.emit(0)
  }

  onFocus() {
    this.isShowGif = false;
    this.showEmojiPicker = false;
    // scroll ve bottom
    this.setScrollToBottomEvent.emit(0)
  }

  onBlur() {
    this.isShowGif = false;
    this.showEmojiPicker = false;
  }

  onSubmit(form: NgForm): void {
    this.isShowGif = false
    // send file
    if (arrSendUrlFile.length > 0 && arrSendUrlToFirebase.length >  0) {
      // reset array image to not display
      this.resetArrayImage.emit();
      // submit file
      this.submitFile(0);
    }
    // send text, emoji, gif
    if (this.message != '') {
      this.showEmojiPicker = false;
      this.inputChatService.submitMessage(encodeURI(this.message))
      // reset
      this.message = "";
      this.inputMessage.nativeElement.value = "";
      // to not display image
      this.resetArrayImage.emit();
    }
  }

  private submitFile(countFile: number) {
    // upload to firebase
    this.ref = arrContainAngularFireStorageReference[countFile]
    this.task = this.ref.put(arrSendUrlToFirebase[countFile]);
    let id = arrSendUrlFile[countFile]
    // khong gui lien ma goi firebase de lay url that cua image
    if (id.includes('png') || id.includes('jpg') || id.includes('jpeg')) {
      // state upload
      this.stateUploadImage = this.task.snapshotChanges().pipe(map((s:any) => s.state));
      this.stateUploadImage.subscribe((state)=>{
        if (state === 'success') {
          // getUrlImageFromFirebase return a promise; wait this get url image from firebase then submit it to api
          this.getUrlImageFromFirebase(arrSendUrlFile[countFile]).then((url:string) =>this.inputChatService.submitMessage(encodeURI(url)))
          // to send more image
          countFile+=1
          if (countFile != arrSendUrlToFirebase.length) {
            this.submitFile(countFile)
          }
          else {
            resetArrayContainFile()
          }
        }
      })
    }
    else {
      this.inputChatService.submitMessage(encodeURI(arrSendUrlFile[countFile]))
      countFile += 1
      if (countFile != arrSendUrlToFirebase.length) {
        this.submitFile(countFile)
      }
      else {
        resetArrayContainFile()
      }
    }

  }


  searchGif(searchTerm: any): void {
    var apiLink = "https://g.tenor.com/v1/search?q=" + searchTerm.value + "&key=LIVDSRZULELA&limit=8";
    this.http.get<any>(apiLink).subscribe(data => {
      this.gifs = data.results;
    })
  }

  changeShowGif() {
    this.isShowGif = !this.isShowGif
    if (this.isShowGif) {
      // tenor api
      var apiLink = "https://g.tenor.com/v1/trending?key=LIVDSRZULELA";
      this.http.get<any>(apiLink).subscribe(data => {
        this.gifs = data.results;
      })
    }
  }

  sendGif(url: string) {
    this.isShowGif = false
    if (url != '') {
      this.inputChatService.submitMessage(encodeURI(url))
    }
  }

  uploadFile(event: any) {
    // add image to display
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      // display image
      let nameFile = event.target.files[0].name
      let file!:File
      // là image nên mới set value cho data, để sau này hiển thị ảnh trước khi gửi
      if (nameFile.endsWith('.jpg') || nameFile.endsWith('.jpeg') || nameFile.endsWith('.png')) {
        file = {name: event.target.files[0].name, type:'image', data:reader.result}
      }
      else {
        file = {name: event.target.files[0].name, type:'file', data:''}
      }
      this.addFile.emit(file);
      let userName = localStorage.getItem("userName")
      // create id name for image
      const id = "firebase_upload_" + userName + "_" + new Date().getTime() + "_" + Math.random().toString().slice(2, 6) + "_upload_chk/"+event.target.files[0].name;
      arrContainAngularFireStorageReference.unshift(this.afStorage.ref(id))
      arrSendUrlFile.unshift(id)
      arrSendUrlToFirebase.unshift(event.target.files[0])
    }
  }


  getUrlImageFromFirebase(nameImage: string) {
    let storageRef = this.afStorage.storage.ref().child(nameImage);
    return storageRef.getDownloadURL().then(urlFB =>{
      return urlFB + "_type-file:image";
    },()=>{
      return '404 not found';
    });
  }
}

