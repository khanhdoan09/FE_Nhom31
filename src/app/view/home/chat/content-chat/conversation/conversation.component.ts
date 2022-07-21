import {Component, Input, OnInit} from '@angular/core';
import {arrText} from "../../../../../model/content-chat";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  @Input() left: string= ""
  @Input() right: string= ""
  @Input() flex_direction: string= ""
  @Input() text_position: string= ""
  @Input() bg_color: string= ""
  @Input() color_text: string= ""
  @Input() color_time: string= ""
  @Input() name: string= ""
  @Input() mes: string= ""
  arrText = arrText;
  ngOnInit(): void {
  }

}
