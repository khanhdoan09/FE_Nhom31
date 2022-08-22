import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recoverpw',
  templateUrl: './recoverpw.component.html',
  styleUrls: ['./recoverpw.component.scss']
})
export class RecoverpwComponent implements OnInit {
  email : string ="";

  resetPassForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.resetPassForm = this.formBuilder.group( {
      email: ['',[Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
  }

  get f() {
    return this.resetPassForm.controls
  }

  resetPass() {
  }
}
