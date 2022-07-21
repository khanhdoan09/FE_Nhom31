import { Component, OnInit } from '@angular/core';
import {MessageApi} from "../../../../model/message_api";

@Component({
  selector: 'app-content-chat',
  templateUrl: './content-chat.component.html',
  styleUrls: ['./content-chat.component.scss']
})
export class ContentChatComponent implements OnInit {

  messages: any = ['','']
  loadMessage!:MessageApi
  constructor () {
    setTimeout(()=>{
      this.loadMessage = JSON.parse(localStorage.getItem("loadMessage") || '{}')
      console.log(this.loadMessage.data.length)
      this.messages = this.loadMessage.data
      for(let i = 0; i < this.messages.length; i++) {
        console.log(this.messages[i])
      }

     }, 3000)
  }


  ngOnInit(): void {

  }

}
