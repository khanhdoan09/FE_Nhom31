import { Component, OnInit } from '@angular/core';
import {MdbNotificationRef} from "mdb-angular-ui-kit/notification";
import { JoinGroupService } from 'src/app/service/home/sidebar/groups-sideabar/join-group.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(public notificationRef: MdbNotificationRef<ToastComponent>,
              public  _joinGroupService :JoinGroupService
  ) { }

  ngOnInit(): void {
  }

}
