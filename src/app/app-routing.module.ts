import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./view/home/home.component";
import {LoginComponent} from "./view/authentication/login/login.component";


const routes: Routes = [
  {
    path: "logIn",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
