import { Injectable } from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";

const oAuthConfig: AuthConfig = {
  issuer : 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId:'241034456767-mpfahua7klavlc54qiom307lq417m8i2.apps.googleusercontent.com',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthService)
    oAuthService.loadDiscoveryDocument().then( ()=> {
      oAuthService.tryLoginImplicitFlow().then( ()=> {
        if(oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow()
          console.log(1234)
        }else {
          oAuthService.loadUserProfile().then( (userProfile)=> {
            console.log(JSON.stringify(userProfile))
          })
        }
      })

    })

  }
}
