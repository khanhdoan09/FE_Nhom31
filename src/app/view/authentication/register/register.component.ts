import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {InputChatService} from "../../../service/home/chat/input-chat/input-chat.service";
import {SignUpService} from "../../../service/home/authentication/sign-up-service.service";
import {LanguageService} from 'src/app/service/home/language/language.service';
import {MustMatch} from "../../../model/valida-password";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  username: string = "";
  password: string = "";
  confirmPassword: string = "";

  signupForm!: FormGroup;
  isSubmitted: boolean = false
  siteKey: string = "6LeFoo4hAAAAAD2inkMpcV78AmCGkyrraDJpVYjW";
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private signUpService: SignUpService,
              private _languageService: LanguageService) {

  }

  get f() {
    return this.signupForm.controls
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required, Validators.minLength(6)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }


  signUp() {
    this.isSubmitted = true;
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) {
      return;
    } else {
      // if(this.username === localStorage.getItem("userName")) {
      //   alert("Tài khoản đã tồn tại");
      // }
      // console.log(localStorage.getItem("username"))
      console.log("Name: " + this.username + "\tUsername: " + this.username + "\tPass: " + this.password + "rePass" + this.confirmPassword);
      this.signUpService.submitSignUp(this.username, this.password)
    }

  }

  viewPassword() {
    this.showPassword = !this.showPassword;
  }

  viewPasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }
}
