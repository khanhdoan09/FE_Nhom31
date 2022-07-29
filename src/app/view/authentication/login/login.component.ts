import { Component, OnInit } from '@angular/core';
import {SignInService} from "../../../service/home/authentication/sign-in.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username : string = "";
  password : string ="";

  signinForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private signInService: SignInService) {
    this.signinForm = this.formBuilder.group( {
      username: [''],
      password: ['']
    })
  }

  ngOnInit(): void {

  }

  login() {
    console.log(this.username+ "_" +this.password);
    this.signInService.submitSignIn(this.username,this.password)
  }
}
