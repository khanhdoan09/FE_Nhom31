export class Api {

  public static login(name: string, password: string) {
    // default login with user long
    return {
      "action": "onchat",
      "data": {
        "event": "LOGIN",
        "data": {
          "user": "chk2",
          "pass": "12345"
        }
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

  public static get_user_list(username: string) {
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
  public static loadMessageList(name: string, page: number) {
    return {
      "action": "onchat",
      "data": {
        "event": "GET_PEOPLE_CHAT_MES",
        "data": {
          "name": name,
          "page": "0"
        }
      }
    }
  }

  // default send message from user long to user ti
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
