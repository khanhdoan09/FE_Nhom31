import { Component, OnInit, NgZone } from '@angular/core';
import {SignInService} from "../../../service/home/authentication/sign-in.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleApiService} from "./login-gg-api/google-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username : string = "";
  password : string ="";
  signinForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private signInService: SignInService,private readonly google: GoogleApiService) {
    this.signinForm = this.formBuilder.group( {
      username:['',[Validators.required]],
      password: ['',[Validators.required,Validators.minLength(6)]],
    })

  }

  ngOnInit(): void {

  }
  get f() {
    return this.signinForm.controls
  }
  login() {

    console.log(this.username+ "_" +this.password);
    this.signInService.submitSignIn(this.username,this.password)
  }

}
