import {Component, Input, OnInit} from '@angular/core';

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

  arrText:string[] = []

  ngOnInit(): void {
    this.text = decodeURI(this.text)
    this.arrText = this.text.split(/((?<=[\bhttp::\/\/\w+]\s+))/ig)
  }

  checkIsLink(text: string) {
    let regexp = new RegExp(/\bhttp[s]?:\/\/\S+/ig)
    return regexp.test(text)
  }
  isDeleted: boolean = false;
  deleteText(event: MouseEvent): void {
    this.isDeleted = true
  }


}
