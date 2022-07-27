import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  userName: any;

  constructor() {
    this.userName = localStorage.getItem("userName") || ""
  }

  ngOnInit(): void {
  }

}
