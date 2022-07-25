import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  //ss
  @Input() left: string= ""
  @Input() right: string= ""
  @Input() flex_direction: string= ""
  @Input() text_position: string= ""
  @Input() bg_color: string= ""
  @Input() color_text: string= ""
  @Input() color_time: string= ""
  // data
  @Input() name: string = ""
  @Input() mes: string = ""
  @Input() time: string = ""
  ngOnInit(): void {
  }

}
