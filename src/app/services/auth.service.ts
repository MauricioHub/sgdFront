import { Injectable }      from '@angular/core';
//import { tokenNotExpired } from 'angular2-jwt';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Profile } from ".././interfaces/profile.interface";
//import * as auth0 from 'auth0-js';
import { environment } from '../../environments/environment';
import { environmentP } from '../../environments/environment.prod';
import { Globals } from '../app.globals';

const API_LOGIN=environmentP.apiLogin;
const API_USEROPTION=environmentP.userOptionsURL;
const API_OPTION=environmentP.optionsURL;
const API_SEARCH=environment.apiSearch;
const API_BANDEJA=environment.apiBandeja;

// Avoid name not found warnings
declare var Auth0Lock: any;
(window as any).global = window;

@Injectable()
export class AuthService {

  heroeURL:string = "http://localhost:8082/v1/pass";
  apiLogin:string = 'http://10.225.13.18:9951/login/authenticate';
  disableRoot:boolean = true;
  sessionRoot:any;
  username:String = '';
  profileUserOption: Profile[] = [];
  objIdRol=[];

  userOptionResult:any[] = [];
  optionResult:any[] = [];

  //apiLogin:string = 'http://localhost:8088/login/authenticate';

  public userProfile:any;

  constructor(public router: Router,
              private http: HttpClient,
              private disableRt:Globals) {}

  public login(user:string,pass:string){

    let body = {
      userPost:user,
      passPost:pass
    };

    return this.http.get( API_LOGIN + '/' + user );

    /*  .map( res=>{
      console.log(res);
      localStorage.setItem("username",user);
      return res;
       }); */
  }


  public login2( user:String, pass:String ){
      this.username = user;
      let body = {
        username:user,
        password:pass
      };

      let headers = new HttpHeaders({
         'Accept':'application/json',
         'Content-Type':'application/json',
         'Access-Control-Allow-Origin':'*'
      });

      return this.http.post( API_LOGIN, body, { headers }  )
      .pipe(
        map((res:any) => {
          this.sessionRoot = res;
          this.objIdRol = res.rolID;
        //  this.setSession(this.sessionRoot);
          console.log('SOY PIPE: ');
          console.log(this.sessionRoot);
          this.getUserOption(this.sessionRoot.userID);
          //this.getOptionsList();
          //this.setProfileUserOption(this.userOptionResult, this.optionResult);

        //  this.router.navigate(['/home']);
        //  console.log('tokem: ');
        //  console.log(res.token);
        //  console.log('ESTOY VALIDADO !!');
        //  console.log(res);
        //  if(res.code == 200)
         // this.handleAuthentication(res,true);
        } /*, (err:HttpErrorResponse) => {
          this.showAlert('CREDENCIALES INCORRECTAS!');
          console.log('SOY PIPE error RESPONSE-');
          console.log('CREDENCIALES INCORRECTAS!');
          /*if(err.status == 401){
            this.showAlert('CREDENCIALES INCORRECTAS!');
            console.log('SOY AUTH SERVICE STATUS-');
            console.log('CREDENCIALES INCORRECTAS!');
          }*/
        //}
      ))
      .subscribe((res:any) => {
      /*  console.log('SOY AUTH SERVICE RES: ');
        console.log(res);
        console.log('SOY AUTH SERVICE session: '); */
        //this.setSession(this.sessionRoot);
      }, (err:HttpErrorResponse) => {
        if(err.status == 401)
          this.showAlert('CREDENCIALES INCORRECTAS!');
        console.log('SOY-AUTH-SERVICE: SUSCRIBEQ!!');
        //console.log('CREDENCIALES INCORRECTAS!');
       /* if(err.status == 401){
          this.showAlert('CREDENCIALES INCORRECTAS!');
          console.log('SOY AUTH SERVICE suscribe STATUS-');
          console.log('CREDENCIALES INCORRECTAS!');
        }*/
     });

     /* .subscribe(res => {
        return res;
      });
      /*    .map( res=>{
            console.log(res);
            this.handleAuthentication(res,true);
          }); */
  }

  public handleAuthentication(authResult, flag:boolean): void {
   // this.auth0.parseHash((err, authResult) => {
      if (authResult.code == 200) {
        window.location.hash = '';
        //console.log('ESTOY EN HANDLE AUTHENTICATION');
      // console.log(authResult.firstName);
      // console.log(authResult.joinDate);
      //  this.setSession(authResult);
        //this.router.navigate(['/home']);
      } else {
      //  this.router.navigate(['/login']);
          this.showAlert('CREDENCIALES INCORRECTAS!');
          console.log('CREDENCIALES INCORRECTAS!');
      }
  };


  private setSession(): void {
    var authResult = this.sessionRoot;
    const expiresAt = new Date(authResult.fechaExpiracion).getTime();
    /*console.log(authResult.token + ', ');
    console.log(expiresAt + ', ');
    console.log(authResult.userID + ', ');
    console.log(authResult.rolID + ', ');
    console.log(this.username); */

  /*  authResult.token
    authResult.fechaExpiracion //Date TO lLONG
    authResult.userID
    authResult.rolID
    this.username;*/

   // const expiresAt = JSON.stringify((authResult.expiresAt * 1000) + new Date().getTime());
    //console.log(authResult.token);
    localStorage.setItem('access_token', authResult.token);
    localStorage.setItem('expires_at', '' + expiresAt);
    localStorage.setItem('logged_username', '' + this.username);
    localStorage.setItem('objIdRol', '' + this.objIdRol);
    console.log(this.objIdRol)
    localStorage.setItem('disableRoot', 'true');
    localStorage.setItem('objIdRol', '' + this.objIdRol);
    //objIdRol
    this.disableRt.disableRoot = true;
    this.router.navigate(['/home']);
  }


  public getUserOption(userId:string){
      console.log('SOY USER OPTION: ');
      console.log(userId);
      let body = {
        userId:userId
      };

      let headers = new HttpHeaders({
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
      });

      return this.http.post( API_USEROPTION, body, { headers }  )
      .pipe(
        map((res:any) => {
          this.userOptionResult = res.userOptionResult;
          this.getOptionsList();
         // this.setProfileUserOption(this.userOptionResult, this.optionResult);
          console.log('SOY LISTADO-OPCIONES: ');
          console.log(this.userOptionResult);
        }
      ))
      .subscribe((res:any) => {
        //console.log('SOY SUBSCRIBEOPTION: ');
        //console.log(res);
      }, (err:HttpErrorResponse) => {
        if(err.status == 401)
          this.showAlert('CREDENCIALES INCORRECTAS!');
    });

  }

  public getOptionsList(){
    let body = {
      optionId:"",
      optionName:"",
      moduleId:""
    };

    let headers = new HttpHeaders({
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'
    });

    return this.http.post( API_OPTION, body, { headers }  )
    .pipe(
      map((res:any) => {
        this.optionResult = res.options;
        this.setProfileUserOption(this.userOptionResult, this.optionResult);
        console.log('SOY LISTADO-MODULOS: ');
        console.log(this.optionResult);
      }
    ))
    .subscribe((res:any) => {
      //console.log('SOY SUBSCRIBE-APIOPTION: ');
      //console.log(res);
    }, (err:HttpErrorResponse) => {
      if(err.status == 401)
        this.showAlert('BAD REQUEST!');
  });

}

  public setProfileUserOption(userOptionResult:any[], optionResult:any[]){
    var userOResult = userOptionResult;
    var oResult = optionResult;
    var lenUserOResult = userOResult.length;
    var lenOResult = oResult.length;
    var p, q;

    let profileVenta = new Profile(false,false,false,false);
    let profileComision = new Profile(false,false,false,false);
    let profileLote = new Profile(false,false,false,false);
    let profilePerfil = new Profile(false,false,false,false);
    this.profileUserOption[0] = profileVenta;
    this.profileUserOption[1] = profileComision;
    this.profileUserOption[2] = profileLote;
    this.profileUserOption[3] = profilePerfil;

    console.log('SOY-SET-PROFILE-USER-OPTION!!!: ');
    console.log(userOResult);
    console.log(oResult);
    console.log(lenUserOResult);
    console.log(lenOResult);

    for(p=0; p<lenUserOResult; p++){
      console.log(userOResult[p].optionName);
      /*let profileNew = new Profile(
        false,
        false,
        false,
        false
      ); */
      for(q=0; q<lenOResult; q++){
         if(userOResult[p].optionId === oResult[q].optionId){

          switch(userOResult[p].optionName){
            case 'ConsultaVenta':
              console.log('SOY CONSULTA-VENTA');
              profileVenta.setConsultaPr(true);
              /*let profileVenta = new Profile(
                true,
                false,
                false,
                false
              );*/
              //  this.batchRegular.push(batchNew);
              if(oResult[q].moduleId === '1'){
                this.profileUserOption[0] = profileVenta;
              }
              //  console.log('modulo VENTA');
                console.log('SOY CONSULTA-VENTA');
                console.log(this.profileUserOption[0].consultaPr,this.profileUserOption[0].creacionPr,this.profileUserOption[0].modificacionCompletaPr,this.profileUserOption[0].modificacionRestringidaPr);
             // if(userOResult[p].optionName === 'GeneraLote')
               // console.log('GENERA-LOTE');
              break;
            case 'ConsultaComision':
              /*let profileComision = new Profile(
                true,
                false,
                false,
                false
              );*/
              profileComision.setConsultaPr(true);
              if(oResult[q].moduleId === '2')
                this.profileUserOption[1] = profileComision;
                console.log('SOY CONSULTA-COMISION');
                console.log(this.profileUserOption[1].consultaPr,this.profileUserOption[1].creacionPr,this.profileUserOption[1].modificacionCompletaPr,this.profileUserOption[1].modificacionRestringidaPr);
              break;
            case 'ConsultaLote':
              /*let profileLote = new Profile(
                true,
                false,
                false,
                false
              );*/
              profileLote.setConsultaPr(true);
              if(oResult[q].moduleId === '3')
                this.profileUserOption[2] = profileLote;
                console.log('SOY CONSULTA-LOTE');
                console.log(this.profileUserOption[2].consultaPr,this.profileUserOption[2].creacionPr,this.profileUserOption[2].modificacionCompletaPr,this.profileUserOption[2].modificacionRestringidaPr);
              break;
            case 'GeneraLote':
              /*let profileGLote = new Profile(
                true,
                true,
                false,
                false
              );*/
              profileVenta.setCreacionPr(true);
              if(oResult[q].moduleId === '1')
                this.profileUserOption[0] = profileVenta;
              break;
            case 'ConsultaPerfiles':
              profilePerfil.setConsultaPr(true);
              if(oResult[q].moduleId === '281')
                this.profileUserOption[3] = profilePerfil;
              break;
            case 'RegularizaLoteCompleto':
              /*let profileRCLote = new Profile(
                true,
                true,
                true,
                false
              );*/
              profileLote.setModificacionCompletaPr(true);
              if(oResult[q].moduleId === '3')
                this.profileUserOption[2] = profileLote;
                console.log('SOY REGULARIZACION-COMPLETA');
                console.log(this.profileUserOption[2].consultaPr,this.profileUserOption[2].creacionPr,this.profileUserOption[2].modificacionCompletaPr,this.profileUserOption[2].modificacionRestringidaPr);
              break;
            case 'RegularizaLoteRestringido':
              profileLote.setModificacionRestringidaPr(true);
              if(oResult[q].moduleId === '3')
                this.profileUserOption[2] = profileLote;
                console.log('SOY REGULARIZACION-COMPLETA');
                console.log(this.profileUserOption[2].consultaPr,this.profileUserOption[2].creacionPr,this.profileUserOption[2].modificacionCompletaPr,this.profileUserOption[2].modificacionRestringidaPr);
              break;
          }
        /*  switch(oResult[q].moduleId){
            case '1':
              if(userOResult[p].optionName === 'ConsultaVenta')
                console.log('CONSULTA-VENTA');
              if(userOResult[p].optionName === 'GeneraLote')
                console.log('GENERA-LOTE');
              break;
            case '2':
              if(userOResult[p].optionName === 'ConsultaComision')
                console.log('CONSULTA-COMISION');
              break;
            case '3':
              if(userOResult[p].optionName === 'ConsultaLote')
                console.log('CONSULTA-LOTE');
              break;
            case '4':
              if(userOResult[p].optionName === 'GeneraLote')
                console.log('GENERA-LOTE');
              break;
          } */

        }

      }
    }
    this.disableRt.profileRoot = this.profileUserOption;
    localStorage.setItem('sales_module', JSON.stringify(this.disableRt.profileRoot[0]));
    localStorage.setItem('fees_module', JSON.stringify(this.disableRt.profileRoot[1]));
    localStorage.setItem('batches_module', JSON.stringify(this.disableRt.profileRoot[2]));
    localStorage.setItem('profiles_module', JSON.stringify(this.disableRt.profileRoot[3]));
    console.log('AUTH-SERVICE-STORAGE: ');
    console.log(localStorage.getItem('sales_module'));
    console.log(localStorage.getItem('fees_module'));
    console.log(localStorage.getItem('batches_module'));
    console.log(localStorage.getItem('profiles_module'));
    this.setSession();
   // this.printProfileUserOption();
  }

 /* public printProfileUserOption(){
    let lenProfileAr = this.profileUserOption.length;
    let p, q;

    for(p=0; p<lenProfileAr; p++){
      let profileNew = this.profileUserOption[p];
      console.log('SOY PRINT-PROFILE: ');
      console.log(profileNew.consultaPr);
      console.log(profileNew.creacionPr);
      console.log(profileNew.modificacionCompletaPr);
      console.log(profileNew.modificacionRestringidaPr);
    }
  }*/

  public logout(): void {
    localStorage.removeItem('access_token');
  //  localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('logged_username');
    localStorage.removeItem('sales_module');
    localStorage.removeItem('fees_module');
    localStorage.removeItem('batches_module');
    //localStorage.removeItem('code_temp');
    // Go back to the home route
    localStorage.setItem('disableRoot', 'false');
    this.disableRt.disableRoot = false;
    this.router.navigate(['/login']);
  }



  public loadSearch(){
    return this.http.post(API_SEARCH,null);
  }

  public getBandeja(){
    return this.http.post(API_BANDEJA,null);
  }

  logout2() {
      // remove user from local storage to log user out
      localStorage.removeItem('username');
      this.router.navigate(['/login']);

  }


  showAlert(message){
    if(window.confirm(message)){
      //console.log('SALIÓ - EXITO');
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/']);
    }
  }


}
