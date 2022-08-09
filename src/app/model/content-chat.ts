import {ChangeDetectorRef} from "@angular/core";

export interface IContentChat {
  messages: any[]
  cd: ChangeDetectorRef
  date: string
  updateDate(newDate: any):boolean
}

