import { Component, OnInit } from '@angular/core';
import {MessageApi} from "../../../../model/message_api";

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  isActive = true
  userName!:string

  constructor() {
      this.isActive = true
      this.userName = localStorage.getItem("userName") || ""
  }

  ngOnInit(): void {
  }


}
