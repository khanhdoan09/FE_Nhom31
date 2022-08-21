import { Subject} from "rxjs";
import {User} from "./user";
import {idSetInterval} from "../service/home/chat/content-chat/content-chat.service";


export class IdSetInterval {
  public static idSetIntervalMessage:any;
  public static idSetIntervalStatus:any;
  public static idSetIntervalAvatar:any;
  public static idSetIntervalGroup:any;


  public static clearAllInterval() {
    console.log(IdSetInterval.idSetIntervalMessage + "~" + IdSetInterval.idSetIntervalStatus + "~" + IdSetInterval.idSetIntervalAvatar)
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
  }

}
export class CurrentUser {
  public static username=''
  public static avatar = new Subject<string>();
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
