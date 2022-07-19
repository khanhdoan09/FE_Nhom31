import { Component, OnInit } from '@angular/core';
import {arrText} from "../../../../../model/content-chat";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  arrText = arrText;
  ngOnInit(): void {
  }

}
