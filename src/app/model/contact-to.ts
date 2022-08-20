import { Subject} from "rxjs";
import {User} from "./user";

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
}

// api return this format when get list user or list group
export interface Contact {
  name: string,
  type: number,
  actionTime: string
}
