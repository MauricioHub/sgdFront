import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot,CanActivate,RouterStateSnapshot } from '@angular/router';
import { AuthoService } from '../servicios/autho.service';


@Injectable({
  providedIn: 'root'
})
export class RolesguardService implements CanActivate {

  constructor(private auth:AuthoService,public router: Router) { }

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
console.log(next);
const rol = next.data.rol;
    if (localStorage.getItem('objIdRol')==rol) {

 console.log("paso el centinela");
  return true;

}else{
  console.error("BLOQUEADO POR GOKU CON DOCTRINA EGOISTA");
  return false;
}


  }
}
