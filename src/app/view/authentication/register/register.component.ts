import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InputChatService} from "../../../service/home/chat/input-chat/input-chat.service";
import {SignUpService} from "../../../service/home/authentication/sign-up-service.service";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email : string ="";
  username : string ="";
  password : string="";
  confirmPassword : string="";

  signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) {

  }

  get f() {
    return this.signupForm.controls
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group( {
      email: ['',[Validators.required, Validators.email]],
      username:['',[Validators.required]],
      password: ['',[Validators.required]],
      confirmPassword: ['',[Validators.required]]
    })
  }
  encryptUsingAES256() {
    // let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    // let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    // let encrypted = CryptoJS.AES.encrypt(
    //   JSON.stringify(this.request), _key, {
    //     keySize: 16,
    //     iv: _iv,
    //     mode: CryptoJS.mode.ECB,
    //     padding: CryptoJS.pad.Pkcs7
    //   });
    // this.encrypted = encrypted.toString();
  }

  signUp() {
    if (this.signupForm.invalid) {
      return;
    }
    else {
      const encryptPass = CryptoJS.AES.encrypt(this.password.trim(), this.username.trim()).toString();
      alert(encryptPass)
      // if(this.username === localStorage.getItem("userName")) {
      //   alert("Tài khoản đã tồn tại");
      // }
      // console.log(localStorage.getItem("username"))

      console.log("Name: " + this.username +"\tUsername: " +this.username + "\tPass: "+ this.password+ "rePass" + this.confirmPassword);
      if(this.password === this.confirmPassword) {
        this.signUpService.submitSignUp(this.username,encryptPass)
      }
      else {
        alert("Please enter true password!")
      }
    }

  }

}
