import { Component, OnInit, NgZone } from '@angular/core';
import {SignInService} from "../../../service/home/authentication/sign-in.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleApiService ,UserInfo} from "../../../service/home/login-gg-api/google-api.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // mailSnippets: string[] = []
  userInfo?: UserInfo

  username : string = "";
  password : string ="";
  signinForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private signInService: SignInService,private readonly google: GoogleApiService) {
    this.signinForm = this.formBuilder.group( {
      username:['',[Validators.required]],
      password: ['',[Validators.required,Validators.minLength(6)]],
    })
    google.userProfileSubject.subscribe( info => {
      this.userInfo = info
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

  isLoggedIn(): boolean {
    return this.google.isLoggedIn();
  }
  logout() {
    this.google.signOut();
  }
  // async getEmails() {
  //   if (!this.userInfo) {
  //     return;
  //   }
  //
  //   const userId = this.userInfo?.info.sub as string
  //   const messages = await lastValueFrom(this.google.emails(userId))
  //   messages.messages.forEach( (element: any) => {
  //     const mail = lastValueFrom(this.google.getMail(userId, element.id))
  //     mail.then( mail => {
  //       this.mailSnippets.push(mail.snippet)
  //     })
  //   });
  // }
}
