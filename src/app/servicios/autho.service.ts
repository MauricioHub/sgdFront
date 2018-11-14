import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
const API_LOGIN=environment.API_LOGIN;
@Injectable({
  providedIn: 'root'
})
export class AuthoService {
    apiLogin:string = 'http://10.225.13.18:9951/login/authenticate';
    disableRoot:boolean = true;
    sessionRoot:any;
    username:String = '';
      objIdRol=0;
  constructor(public router: Router,
              private http: HttpClient) { }

              public setSession(): void {
                var authResult = this.sessionRoot;
                const expiresAt = new Date(authResult.fechaExpiracion).getTime();
                localStorage.setItem('access_token', authResult.token);
                localStorage.setItem('expires_at', '' + expiresAt);
                localStorage.setItem('logged_username', '' + this.username);
                  localStorage.setItem('objIdRol', '' + this.objIdRol);
            console.log(this.objIdRol)
                localStorage.setItem('disableRoot', 'true');
                this.router.navigate(['/home']);
              }



}
