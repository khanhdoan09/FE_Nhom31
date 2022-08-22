import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(public translateService: TranslateService) {
    this.translateService.setDefaultLang("vn");
    this.translateService.use("vn");
  }

  changeLanguage(language: any) {
     this.translateService.use(language.target.value);
  }
}
