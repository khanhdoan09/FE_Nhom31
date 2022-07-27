import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../../../../model/message";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  constructor() { }
  // css
  @Input() flex_direction: string= ""
  @Input() left: string= ""
  @Input() right: string= ""
  @Input() bg_color: string= ""
  @Input() color_text: string= ""
  @Input() color_time: string= ""

  // data
  @Input() text: string = "";
  @Input() time: string = ""

  colons=''

  arrMessage: Message[] = []
  ngOnInit(): void {

    const regex1 = /((?=\{:[\w|\W]+:\})|(?<=\{:[\w|\W]+:\}))/;
    const regex2 = /{:[\w|-]+:}+/g

    // colons and not colons
    let arrAll = this.text.split(regex1)
    let arrColons = this.text.match(regex2)
    console.log(this.text+"~~"+arrColons)
    if (arrAll != null) {
      for (let i = 0; i <arrAll.length; i++) {
        if (arrColons?.includes(arrAll[i])) {
          this.arrMessage.push(this.toIconMessage(arrAll[i]))
          this.colons = arrAll[i].slice(1, -1)
        }
        else {
          this.arrMessage.push(this.toNormalMessage(arrAll[i]))
        }
      }
    }
  }

  toNormalMessage(value: string): Message {
    return {value: value, isIcon: false}
  }

  toIconMessage(value: string): Message {
    value = value.slice(1,-1) // to remove { }
    return {value: value, isIcon: true}
  }

  checkIsIcon(message: Message) {
    if (message.isIcon) {
      this.colons = message.value
      return true
    }
    else {
      return false
    }
  }

  isDeleted: boolean = false;
  deleteText(event: MouseEvent): void {
    this.isDeleted = true
  }

}
