/*
type dùng để kiểm tra file có là image không
nếu phải thì set value cho data
để sau này load image lên trước khi gửi
*/
import {AngularFireStorageReference} from "@angular/fire/compat/storage";

export interface File {
  name:string,
  type:string,
  data:any
}

// để gửi tên lên api nlu
let arrSendUrlFile:string[] = [];
// để gửi tên lên api firebase
let arrSendUrlToFirebase: any[] = [];
// để gửi data lên firebase
let arrContainAngularFireStorageReference: AngularFireStorageReference[] = [];

function resetArrayContainFile() {
  arrSendUrlToFirebase=[]
  arrSendUrlFile=[]
  arrContainAngularFireStorageReference=[]
}
export {arrSendUrlFile, arrSendUrlToFirebase, arrContainAngularFireStorageReference, resetArrayContainFile}
