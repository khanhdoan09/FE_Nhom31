import {Component, OnInit} from '@angular/core';
import {SignInService} from "../../../service/home/authentication/sign-in.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleApiService, UserInfo} from "../../../service/home/login-gg-api/google-api.service";
import {Router} from "@angular/router";
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

  }

  ngOnInit(): void {

  }

  get f() {
    return this.signinForm.controls
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


  viewPassword() {
    this.showPassword = !this.showPassword;
  }
}
