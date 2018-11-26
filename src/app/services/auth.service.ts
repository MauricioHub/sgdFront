import { Injectable }      from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Profile } from ".././interfaces/profile.interface";
//import { tokenNotExpired } from 'angular2-jwt';
//import { Observable } from 'rxjs/Observable';
//import * as auth0 from 'auth0-js';
import { environment } from '../../environments/environment';
import { environmentP } from '../../environments/environment.prod';
import { Globals } from '../app.globals';
import { storeCleanupWithContext } from '@angular/core/src/render3/instructions';

const API_LOGIN=environmentP.apiLogin;
const API_USEROPTION=environmentP.userOptionsURL;
const API_OPTION=environmentP.optionsURL;
const API_SEARCH=environment.apiSearch;
const API_BANDEJA=environment.apiBandeja;
const API_DASHBOARD=environmentP.dashboardURL;

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
          this.getUserOption(this.sessionRoot.userID);
        } /*, (err:HttpErrorResponse) => {
          }*/
      ))
      .subscribe((res:any) => {

      }, (err:HttpErrorResponse) => {
        if(err.status == 401)
          this.showAlert('CREDENCIALES INCORRECTAS!');
     });
  }

  public handleAuthentication(authResult, flag:boolean): void {
   // this.auth0.parseHash((err, authResult) => {
      if (authResult.code == 200) {
        window.location.hash = '';
      } else {
      //  this.router.navigate(['/login']);
          this.showAlert('CREDENCIALES INCORRECTAS!');
          console.log('CREDENCIALES INCORRECTAS!');
      }
  };


  private setSession(): void {
    var authResult = this.sessionRoot;
    const expiresAt = new Date(authResult.fechaExpiracion).getTime();
    localStorage.setItem('access_token', authResult.token);
    localStorage.setItem('expires_at', '' + expiresAt);
    localStorage.setItem('logged_username', '' + this.username);
    localStorage.setItem('objIdRol', '' + this.objIdRol);
    console.log(this.objIdRol)
    localStorage.setItem('disableRoot', 'true');
    localStorage.setItem('objIdRol', '' + this.objIdRol);

    this.disableRt.disableRoot = true;
    this.disableRt.refreshSession = true;
    this.router.navigate(['/home']);
  }


  public getUserOption(userId:string){
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
          this.getSalesOrderHistory();
        }
      ))
      .subscribe((res:any) => {

      }, (err:HttpErrorResponse) => {
        if(err.status == 401)
          this.showAlert('CREDENCIALES INCORRECTAS!');
    });

  }


  public setProfileUserOption(userOptionResult:any[]){
    var lenOResult = userOptionResult.length;
    var p, q;

    let profileVenta = new Profile(false,false,false,false,false);
    let profileComision = new Profile(false,false,false,false,false);
    let profileLote = new Profile(false,false,false,false,false);
    let profilePerfil = new Profile(false,false,false,false,false);
    this.profileUserOption[0] = profileVenta;
    this.profileUserOption[1] = profileComision;
    this.profileUserOption[2] = profileLote;
    this.profileUserOption[3] = profilePerfil;

    for(p=0;p<lenOResult;p++){
      switch(userOptionResult[p].moduleId){
        case '1':
          if(userOptionResult[p].moduleStatus == 'A'){
            profileVenta.setModulePr(true);
            localStorage.setItem('1', 'A');
            switch(userOptionResult[p].optionType){
              case 'CONSULTA':
                if(userOptionResult[p].optionStatus == 'A'){
                  profileVenta.setConsultaPr(true);
                }
                break;
              case 'CREACION':
                if(userOptionResult[p].optionStatus == 'A'){
                  profileVenta.setCreacionPr(true);
                }
                break;
              case 'ACTUALIZACION':
                if(userOptionResult[p].optionStatus == 'A'){
                  profileVenta.setModificacionCompletaPr(true);
                }
                break;
            }
            this.profileUserOption[0] = profileVenta;
          } else
            localStorage.setItem('1', 'A');
          break;
        case '2':
          if(userOptionResult[p].moduleStatus == 'A'){
            profileComision.setModulePr(true);
            switch(userOptionResult[p].optionType){
              case 'CONSULTA':
                if(userOptionResult[p].optionStatus == 'A'){
                  profileComision.setConsultaPr(true);
                }
                break;
              case 'CREACION':
                if(userOptionResult[p].optionStatus == 'A'){
                  profileComision.setCreacionPr(true);
                }
                break;
              case 'ACTUALIZACION':
                if(userOptionResult[p].optionStatus == 'A'){
                  profileComision.setModificacionCompletaPr(true);
                }
                break;
            }
            this.profileUserOption[1] = profileComision;
          } else
            localStorage.setItem('2', 'A');
          break;
        case '3':
          if(userOptionResult[p].moduleStatus == 'A'){
            profileLote.setModulePr(true);
            switch(userOptionResult[p].optionType){
              case 'CONSULTA':
                if(userOptionResult[p].optionStatus == 'A'){
                  profileLote.setConsultaPr(true);
                }
                break;
              case 'CREACION':
                if(userOptionResult[p].optionStatus == 'A'){
                  profileLote.setCreacionPr(true);
                }
                break;
              case 'ACTUALIZACION':
                if(userOptionResult[p].optionStatus == 'A'){
                  profileLote.setModificacionCompletaPr(true);
                }
                break;
            }
            this.profileUserOption[2] = profileLote;
          } else
            localStorage.setItem('3', 'A');
          break;
        case '281':
          if(userOptionResult[p].moduleStatus == 'A'){
            profilePerfil.setModulePr(true);
            switch(userOptionResult[p].optionType){
              case 'CONSULTA':
                if(userOptionResult[p].optionStatus == 'A'){
                  profilePerfil.setConsultaPr(true);
                }
                break;
              case 'CREACION':
                if(userOptionResult[p].optionStatus == 'A'){
                  profilePerfil.setCreacionPr(true);
                }
                break;
              case 'ACTUALIZACION':
                if(userOptionResult[p].optionStatus == 'A'){
                  profilePerfil.setModificacionCompletaPr(true);
                }
                break;
            }
            this.profileUserOption[3] = profilePerfil;
          } else
            localStorage.setItem('281', 'A');
          break;        
      }

    }
    this.disableRt.profileRoot = this.profileUserOption;
    localStorage.setItem('sales_module', JSON.stringify(this.disableRt.profileRoot[0]));
    localStorage.setItem('fees_module', JSON.stringify(this.disableRt.profileRoot[1]));
    localStorage.setItem('batches_module', JSON.stringify(this.disableRt.profileRoot[2]));
    localStorage.setItem('profiles_module', JSON.stringify(this.disableRt.profileRoot[3]));
    this.setSession();
  }
  

  public logout(): void {
    localStorage.clear();
    this.disableRt.disableRoot = false;
    this.disableRt.refreshSession = false;
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
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/']);
    }
  }

  public getSalesOrderHistory(){
    var dayEnd, monthStart, yearStart;
    var today = new Date();
    dayEnd = today.getDate();
    monthStart = today.getMonth();
    yearStart = today.getFullYear();
    if((dayEnd / 10) == 0)
      dayEnd = '0' + today.getDate();
    var startDate = '01/' + (monthStart+1) + '/' + yearStart;
    var endDate = dayEnd + '/' + (monthStart+1) + '/' + yearStart;
    let body = {
      startDate:startDate,
      endDate:endDate
    };
    var salesOrderHistory = [];
    var locale = "es";
    var month = today.toLocaleString(locale, {month: "long"});
    localStorage.setItem('monthPieData', month);

    let headers = new HttpHeaders({
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'      
    });  

    return this.http.post( API_DASHBOARD, body, { headers }  )     
    .pipe(
      map((res:any) => {
        salesOrderHistory = this.setValueOrdersDashboard(res.saleResumeResult);
        //console.log(salesOrderHistory);
        localStorage.setItem('pieData', JSON.stringify(salesOrderHistory[0]));
        this.setProfileUserOption(this.userOptionResult);
        return res.saleResumeResult;             
      })
    )
    .toPromise().then((data:any) => {
    });
  }

  
  setValueOrdersDashboard(statusOrder){
    var i;
    var lenStatusOrder = statusOrder.length;
    var historyList = [];
    var pieData = [];

    for(i=0; i<lenStatusOrder; i++){
      switch(statusOrder[i].status){
        case 'PENDIENTE':
          historyList[2] = statusOrder[i].orders;
          break;
        case 'REGULARIZADO':
          historyList[0] = statusOrder[i].orders;
          break;
        case 'RECHAZADO':
          historyList[1] = statusOrder[i].orders;
          break;    
      }
    }
    var dataCard = {
      "data": []
    }

    if(historyList.length == 0)
      dataCard = {
        "data": [0,0,0]
      }
    else
      dataCard = {
        "data": historyList
      }

    pieData = [dataCard];
    return pieData;
  }

}
