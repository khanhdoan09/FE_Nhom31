import {Component, OnInit} from '@angular/core';
import {ProfileService} from 'src/app/service/home/sidebar/profile-sidebar/profile.service';
import {LanguageService} from "../../../../../service/home/language/language.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public profileService: ProfileService,
              public _languageService: LanguageService) {
  }

  ngOnInit(): void {

  }


}
