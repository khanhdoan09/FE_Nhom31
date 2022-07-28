import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {TestConnectService} from 'src/app/service/api/testConnectService';
import { CreateGroupService } from 'src/app/service/home/sidebar/groups-sideabar/create-group.service';
import {Api} from "../../../../../service/api/api";
import {GroupsService} from "../../../../../service/home/sidebar/groups-sideabar/groups.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  nameRoom: any = '';
  isShowing = false;
  txtSearchGroup: any;

  constructor(public _groupsService: GroupsService,
              public _createGroupService: CreateGroupService) {
    this._groupsService.runService();
    // this._createGroupService.runService(this.nameRoom);
  }

  ngOnInit(): void {
  }

  openModal() {

  }
  createHandler(){
    this._createGroupService.runService(this.nameRoom);
    this.isShowing = false;
  }
  selectMessage(group: any) {
    localStorage.setItem('group', JSON.stringify(group));
  }
}
