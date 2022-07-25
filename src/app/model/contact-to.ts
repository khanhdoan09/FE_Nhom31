import { Subject} from "rxjs";
import {User} from "./user";

export class ContactTo {
  public static contactTo = new Subject<User>();
}
