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
      if ( ((localStorage.getItem('logged_username')!=null) &&
      (localStorage.getItem('logged_username')!='')) && (localStorage.getItem('objIdRol')==rol)) {

   console.log("paso el centinela");
    return true;

  }else{
    console.error("blqoueado por goku");
    return false;
  }


    }
}
