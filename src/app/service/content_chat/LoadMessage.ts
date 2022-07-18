
import {Subject} from "rxjs";
import {configure} from "../../configure/Configure";
import {MessageLogin} from "../../model/login";
import {map} from "rxjs/operators";
import {WebSocketService} from "../websocket/websocket_service";
export class LoadMessage {


  public get_nhom_ws: Subject<any>;

  constructor(private webSocketService: WebSocketService) {

    this.get_nhom_ws = <Subject<MessageLogin>>this.webSocketService
      .connect('ws://140.238.54.136:8080/chat/chat').pipe(map(
        (response: MessageEvent): MessageLogin => {
          const data = JSON.parse(response.data);
          return {
            status: data.status,
            data: data.data,
            mes: data.mes,
            event: data.event,
          };
        }));
  }


  public getMessageSent(ten: string, page: number) {
    this.get_nhom_ws.next(
      {
        "action": "onchat",
        "data": {
          "event": "GET_PEOPLE_CHAT_MES",
          "data": {
            "name": ten,
            "page": page
          }
        }
      }
    );
  }
}
