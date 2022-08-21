import {Component, OnInit, NgZone} from '@angular/core';
import {SignInService} from "../../../service/home/authentication/sign-in.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleApiService, UserInfo} from "../../../service/home/login-gg-api/google-api.service";
import {lastValueFrom} from "rxjs";
import * as CryptoJS from 'crypto-js';
import {Router} from "@angular/router";
import {ContactTo} from "../../../model/contact-to";
import { LanguageService } from 'src/app/service/home/language/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // mailSnippets: string[] = []
  userInfo?: UserInfo
  showPassword: boolean = false;
  username: string = "";
  password: string = "";
  signinForm!: FormGroup;
  isSubmitted: boolean = false
  siteKey: string = "6LeFoo4hAAAAAD2inkMpcV78AmCGkyrraDJpVYjW";

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private signInService: SignInService,
              private readonly google: GoogleApiService,
              private _languageService: LanguageService) {

    if (document.cookie.indexOf('username=') != -1 && document.cookie.indexOf('password=') != -1) {
      setTimeout(()=>{
        this.signInService.checkSignInWithCookie();
      },500)
    }


    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]],
    })
    google.userProfileSubject.subscribe(info => {
      this.userInfo = info
    })

  }

  ngOnInit(): void {

  }

  get f() {
    return this.signinForm.controls
  }

  convertText(conversion: string) {
    // if (conversion=="encrypt") {
    //   this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
    // }
    // else {
    //   this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
    //
    // }
  }

  login() {
    this.isSubmitted = true;
    this.signinForm.markAllAsTouched();
    if (this.signinForm.valid === true) {
      this.signInService.submitSignIn(this.username, this.password)
    } else {
      return;
    }
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
  viewPassword() {
    this.showPassword = !this.showPassword;
  }
}
