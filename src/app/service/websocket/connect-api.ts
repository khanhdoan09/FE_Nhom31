import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {WebSocketService} from "./websocket_service";
import {MessageApi} from "../../model/message_api";
import {configure} from "../../configure/Configure";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConnectApi {
  public subject!: Subject<any> | undefined | null;


  constructor(private ws: WebSocketService) {
    this.create();
  }

  public create() {
    this.subject = <Subject<MessageApi>>this.ws.connect(configure.CHAT_URL).pipe(map(
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

  public clearConnect() {
    this.ws.clearConnect()
  }
}
