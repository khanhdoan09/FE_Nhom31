
import {Subject} from "rxjs";
import {configure} from "../../configure/Configure";
import {MessageApi} from "../../model/message_api";
import {map} from "rxjs/operators";
import {WebSocketService} from "../websocket/websocket_service";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class TestConnectService {
  public messages: Subject<any>;

  constructor(wsService: WebSocketService) {
    this.messages = <Subject<MessageApi>>wsService.connect(configure.CHAT_URL).pipe(map(
      (response: MessageEvent): MessageApi => {
        let data = JSON.parse(response.data);
        return {
          status: data.status,
          data: data.data,
          mes: data.mes,
          event: data.event
        };
      }
    ));
  }
}
