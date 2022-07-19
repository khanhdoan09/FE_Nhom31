export class Api {
  // default login with user ti
  public static login = {
    "action": "onchat",
    "data": {
      "event": "LOGIN",
      "data": {
        "user": "ti",
        "pass": "12345"
      }
    }
  }

  // default load message of user ti and user long
  public static loadMessage = {
    "action": "onchat",
    "data": {
      "event": "GET_PEOPLE_CHAT_MES",
      "data": {
        "name": "Long",
        "page": "0"
      }
    }
  }
}
