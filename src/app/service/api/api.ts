export class Api {

  public static login(name: string, password: string) {
     // default login with user ti
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

  // default load message of user ti and user long
  public static loadMessage(name: string, page: number) {
     return {
       "action": "onchat",
       "data": {
         "event": "GET_PEOPLE_CHAT_MES",
         "data": {
           "name": name,
           "page": page
         }
       }
     }
  }
}
