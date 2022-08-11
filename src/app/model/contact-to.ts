import { Subject} from "rxjs";
import {User} from "./user";

export class ContactTo {
  public static contactTo = new Subject<User>();
}

// api return this format when get list user or list group
export interface Contact {
  name: string,
  type: number,
  actionTime: string
}
