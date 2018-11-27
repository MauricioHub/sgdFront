import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot,CanActivate,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleguardService implements CanActivate {

  constructor(private auth:AuthService,public router: Router) { }

    canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
  console.log(next);
  const rol = next.data.rol;
  const vend = next.data.vend;
  const jefecac = next.data.jefecac;
  const cac = next.data.cac;
  const comi = next.data.comi;
  const dig = next.data.dig;
    const archi = next.data.archi;


      if (  ((localStorage.getItem('logged_username')!=null) &&(localStorage.getItem('logged_username')!=''))&&
      ((localStorage.getItem('objIdRol')==rol)||(localStorage.getItem('objIdRol')==vend))||/*nuevo ||*/
      ((localStorage.getItem('objIdRol')==cac)||(localStorage.getItem('objIdRol')==jefecac))||/*nuevo ||*/
      ((localStorage.getItem('objIdRol')==comi)||(localStorage.getItem('objIdRol')==dig))||/*nuevo ||*/((localStorage.getItem('objIdRol')==archi))  /*finzaliza el if*/) {

   console.log("paso el centinela");
    return true;

  }else{
    console.error("blqoueado por goku");
    return false;
  }


    }
}
