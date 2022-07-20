import { Component, OnInit } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  isShowing = false;
  constructor() { }

  ngOnInit(): void {
  }

  openModal() {

  }
}
