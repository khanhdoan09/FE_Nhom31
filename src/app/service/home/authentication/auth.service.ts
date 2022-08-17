import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login_success= false;

  constructor(private router: Router) { }

  login(log_email: string, log_pw: string){
    // Guess role
    if(log_email=="guess" && log_pw =="123")
    {
      this.login_success=true
    }
    // User role
    else if(log_email=="user" && log_pw =="123")
    {
      this.login_success=true
    }
    // Admin role
    else if(log_email=="admin" && log_pw =="123")
    {
      this.login_success=true
    }
    else{
      this.login_success=false
    }

    // Redirect to dashboard (AuthGuard will check with canActivate() method )
    this.router.navigate(['/home']);
  }

  // Redirect to login page
  logout(){
    this.router.navigate(['/logIn']);
  }

  isAuthenticated(){
    // return true if the user enter correct user name and password
    return this.login_success
  }
}
