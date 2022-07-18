import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {arrText} from "../../../../model/content-chat";

@Component({
  selector: 'app-input-chat',
  templateUrl: './input-chat.component.html',
  styleUrls: ['./input-chat.component.scss']
})
export class InputChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  user = {
    userName: "mr A",
    text: "",
  }

  onSubmit(form: NgForm): void {
    arrText.push(this.user.text)
    this.user.text = ""
  }

}
