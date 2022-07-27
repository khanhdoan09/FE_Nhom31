import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TestConnectService} from 'src/app/service/api/testConnectService';
import {Api} from "../../../../../service/api/api";
import {GroupsService} from "../../../../../service/home/sidebar/groups-sideabar/groups.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  isShowing = false;
  txtSearchGroup: any;

  constructor(public _groupsService: GroupsService) {
    this._groupsService.runService();
  }

  ngOnInit(): void {
  }

  openModal() {

  }

  selectMessage(group: any) {
    localStorage.setItem('group', JSON.stringify(group));
  }
}
