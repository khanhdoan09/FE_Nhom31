import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InputChatService} from "../../../service/home/chat/input-chat/input-chat.service";
import {SignUpService} from "../../../service/home/authentication/sign-up-service.service";

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

  signUp() {
    if (this.signupForm.invalid) {
      console.log(23456)
      return;
    }
    else {
      console.log("Name: " + this.username +"\tUsername: " +this.username + "\tPass: "+ this.password+ "rePass" + this.confirmPassword);
      if(this.password === this.confirmPassword) {
        this.signUpService.submitSignUp(this.username,this.password)
      }
      else {
        alert("Please enter true password!")
      }
    }

  }

}
