import { Component, OnInit } from '@angular/core';
import {LanguageService} from "../../../service/home/language/language.service";

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  constructor(public _languageService: LanguageService) { }

  ngOnInit(): void {
  }

}
