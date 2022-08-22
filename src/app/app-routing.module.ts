import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./view/home/home.component";
import {LoginComponent} from "./view/authentication/login/login.component";
import {RegisterComponent} from "./view/authentication/register/register.component";
import {RecoverpwComponent} from "./view/authentication/recoverpw/recoverpw.component";
import {PagenotfoundComponent} from "./view/home/pagenotfound/pagenotfound.component";
import {FilterAuthenticationGuard} from "./model/guard/filter-authentication.guard";


const routes: Routes = [
  {
    path: "logIn",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "resetPass",
    component: RecoverpwComponent,
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [FilterAuthenticationGuard]
  },
  { path: '', pathMatch: 'full',
    component: PagenotfoundComponent },
  {path: '404', component: PagenotfoundComponent},
  { path: '**', pathMatch: 'full',
    component: PagenotfoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
