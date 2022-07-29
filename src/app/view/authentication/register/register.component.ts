import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {InputChatService} from "../../../service/home/chat/input-chat/input-chat.service";
import {SignUpService} from "../../../service/home/authentication/sign-up-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name : string ="";
  username : string ="";
  password : string="";
  repassword : string="";

  signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService) {
    this.signupForm = this.formBuilder.group( {
      name:[''],
      email: [''],
      repassword: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  signUp() {
    console.log("Name: " + this.name +"\tUsername: " +this.username + "\tPass: "+ this.password);
    if(this.password === this.repassword) {
      this.signUpService.submitSignUp(this.username,this.password)
    }
    else {
      alert("Please enter true password!")
    }
  }

}
