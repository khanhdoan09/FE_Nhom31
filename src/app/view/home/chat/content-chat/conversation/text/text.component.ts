import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() text = "";

  isDeleted: boolean = false;
  deleteText(event: MouseEvent): void {
    this.isDeleted = true
  }

}
