import {pagination} from "../../model/pagination";

export class Api {

  public static login(name: string, password: string) {
    return {
      "action": "onchat",
        "data": {
        "event": "LOGIN",
          "data": {
          "user": name,
            "pass": password
        }
      }
    }
  }

  public static signUp(name: string, password: string) {
    // default login with user long
    return {
      "action": "onchat",
      "data": {
        "event": "REGISTER",
        "data": {
          "user": name,
          "pass": password
        }
      }
    }
  }

  public static reLogin(name: string, code: string) {
    return {
      "action": "onchat",
      "data": {
        "event": "RE_LOGIN",
        "data": {
          "user": name,
          "code": code
        }
      }
    }
  }

  public static logout() {
    return {
      "action": "onchat",
      "data": {
        "event": "LOGOUT"
      }
    }
  }


  // get user list
  public static loadUserList() {
    return {
      "action": "onchat",
      "data": {
        "event": "GET_USER_LIST"
      }
    }
  }

  public static checkStatus(username: string) {
    return {
      "action": "onchat",
      "data": {
        "event": "CHECK_USER",
        "data": {
          "user": username
        }
      }
    }
  }


  // default load message of user ti and user long
  // only to get new message
  public static loadMessageList(name: string) {
    return {
      "action": "onchat",
      "data": {
        "event": "GET_PEOPLE_CHAT_MES",
        "data": {
          "name": name,
          "page": 1
        }
      }
    }
  }

  // to get old message from user
  public static loadOldMessageList(name: string) {
    return {
      "action": "onchat",
      "data": {
        "event": "GET_PEOPLE_CHAT_MES",
        "data": {
          "name": name,
          "page": pagination
        }
      }
    }
  }

  public static loadMessageListFromGroup(name: string) {
    return {
      "action": "onchat",
      "data": {
        "event": "GET_ROOM_CHAT_MES",
        "data": {
          "name": name,
          "page": 1
        }
      }
    }
  }

  // to get old message from group
  public static loadOldMessageListFromGroup(name: string) {
    return {
      "action": "onchat",
      "data": {
        "event": "GET_ROOM_CHAT_MES",
        "data": {
          "name": name,
          "page": pagination
        }
      }
    }
  }

  public static sendMessage(to: string, message: string) {
    return {
      "action": "onchat",
      "data": {
        "event": "SEND_CHAT",
        "data": {
          "type": "people",
          "to": to,
          "mes": message
        }
      }
    }
  }

  public static sendMessageToGroup(to: string, message: string) {
    return {
      "action": "onchat",
      "data": {
        "event": "SEND_CHAT",
        "data": {
          "type": "room",
          "to": to,
          "mes": message
        }
      }
    }
  }

  public static create_room(nameRoom: any) {
    return {
      "action": "onchat",
      "data": {
        "event": "CREATE_ROOM",
        "data": {
          "name": nameRoom
        }
      }
    }
  }
  public static join_room(nameRoomJ: any) {
    return {
      "action": "onchat",
      "data": {
        "event": "JOIN_ROOM",
        "data": {
          "name": nameRoomJ
        }
      }
    }
  }
}
