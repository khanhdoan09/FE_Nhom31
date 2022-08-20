import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  userNameConnect: string ="";
  connectForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.connectForm = this.formBuilder.group( {
      userNameConnect: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  get f() {
   return this.connectForm.controls
  }
  connect() {
    alert(this.userNameConnect.trim())
    this.userNameConnect ="";
  }
}
