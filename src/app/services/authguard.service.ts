import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot,CanActivate,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private auth:AuthService,public router: Router) { }

    canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
  console.log(next);
      if ( (localStorage.getItem('logged_username')!=null) && (localStorage.getItem('logged_username')!='') ) {

   console.log("paso el centinela");
    return true;

  }else{
    console.error("blqoueado por goku");
    return false;
  }


    }
}
