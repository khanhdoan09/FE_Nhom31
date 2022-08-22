import { Subject} from "rxjs";
import {User} from "./user";

export class IdSetInterval {
  public static idSetIntervalContactTo:any;
  public static idSetIntervalMessage:any;
  public static idSetIntervalStatus:any;
  public static idSetIntervalAvatar:any;
  public static idSetIntervalGroup:any;


  public static clearAllInterval() {
    if (IdSetInterval.idSetIntervalMessage) {
      clearInterval(IdSetInterval.idSetIntervalMessage)
    }
    if (IdSetInterval.idSetIntervalStatus) {
      clearInterval(IdSetInterval.idSetIntervalStatus)
    }
    if (IdSetInterval.idSetIntervalAvatar) {
      clearInterval(IdSetInterval.idSetIntervalAvatar)
    }
    if (IdSetInterval.idSetIntervalGroup) {
      clearInterval(IdSetInterval.idSetIntervalGroup)
    }
    if (IdSetInterval.idSetIntervalContactTo) {
      clearInterval(IdSetInterval.idSetIntervalContactTo)
    }
  }

  public static clearAllIntervalInSideBar() {
    if (IdSetInterval.idSetIntervalStatus) {
      clearInterval(IdSetInterval.idSetIntervalStatus)
    }
    if (IdSetInterval.idSetIntervalAvatar) {
      clearInterval(IdSetInterval.idSetIntervalAvatar)
    }
    if (IdSetInterval.idSetIntervalGroup) {
      clearInterval(IdSetInterval.idSetIntervalGroup)
    }
    if (IdSetInterval.idSetIntervalContactTo) {
      clearInterval(IdSetInterval.idSetIntervalContactTo)
    }
  }
}

export class CurrentUser {
  public static username='';
  public static subject = new Subject<string>();
}

export class ArrayAvatar {
  public static avatar = new Map();
}

export class ContactTo {
  public static contactTo = new Subject<User>();
  public static isLogin =false;
  public test = 'not'
}

// api return this format when get list user or list group
export interface Contact {
  name: string,
  type: number,
  actionTime: string
}
