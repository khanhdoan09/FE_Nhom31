import {Component, OnInit} from '@angular/core';
import { LanguageService } from 'src/app/service/home/language/language.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(public _languageService: LanguageService) {
  }

  ngOnInit(): void {
  }

  status: any = "chats"

  tabsChange(status: any) {
    this.status = status
  }
}
