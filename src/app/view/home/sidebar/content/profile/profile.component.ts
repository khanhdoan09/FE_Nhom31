import {Component, OnInit} from '@angular/core';
import {ProfileService} from 'src/app/service/home/sidebar/profile-sidebar/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string;

  constructor(public profileService: ProfileService) {
    this.userName = localStorage.getItem("userName") || "";
    this.profileService.runService(this.userName);
  }

  ngOnInit(): void {

  }


}
