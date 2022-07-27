import {Component, OnInit} from '@angular/core';
import {TestConnectService} from 'src/app/service/api/testConnectService';
import {Api} from "../../../../../service/api/api";
import {StatusUser} from "../../../../../model/message_api";
import {ProfileService} from 'src/app/service/home/sidebar/profile-sidebar/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // userObject: StatusUser = {status: undefined};
  userName: string;
  public message = {
    "text-info": true,
    "text-danger": false
  }

  constructor(
    public profileService: ProfileService
  ) {
    this.profileService.runService();
    this.userName = localStorage.getItem("userName") || ""
  }

  ngOnInit(): void {

  }


}
