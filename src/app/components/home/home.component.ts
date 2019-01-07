import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { HeroesService } from '../../services/heroes.service';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../app.globals';
import { StatComponent } from '../stat/stat.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUsername:string = "";
  checkATag:boolean[] = [];
  ordersHistory:any[] = [];
  mymodel;
  regularizedCard:string = '';
  regularizedLenCard:string = '';
  refusedCard:string = '';
  refusedLenCard:string = '';
  pendingCard:string = '';
  pendingLenCard:string = '';
  flagSession:string = '';
  ipPCMachine:string = '';
  ipCellPhone:string = '';
  //0:pcMachine, 1:cellPhone, 2:tablet
  typeDevice:number = 0;

  // ADD CHART OPTIONS. 
  pieChartOptions = {
    responsive: true
  }

  pieChartLabels =  ['REGLR', 'RECHZ', 'PENDT'];
  pieChartColor:any = [
      {
          /*backgroundColor: ['rgba(30, 169, 224, 0.8)',
          'rgba(255,165,0,0.9)',          
          'rgba(255, 102, 0, 0.9)'
          ]*/
          backgroundColor: ['#007bff',
          '#ffc107',          
          '#28a745'
          ]
      }
  ];

  pieChartData:any = [
      { data: [28], label: 'Account A' },
      { data: [28], label: 'Account B' },
      { data: [28], label: 'Account C' }
  ];

  chartData: any[] = [];

  pieData = [];
  pieDataJson;
  monthPieData;

  constructor(private router:Router,
              private _authService:AuthService,
              private _heroesService:HeroesService,
              private httpService: HttpClient,
              private disableRt:Globals) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;

    console.log('SOY-HOME: ');
    console.log(window.history);  
      
    let historySe = localStorage.getItem('historySession');
    //window.name = 'Ventana1';
    this.loggedUsername = localStorage.getItem('logged_username');
    this.monthPieData = localStorage.getItem('monthPieData');
    this.pieDataJson = JSON.parse(localStorage.getItem('pieData'));
    this.pieData = [this.pieDataJson];    
    this.loadFlagUser();
    this.checkFlagUser();
    this.regularizedCard = 'Regularizadas!';
    this.refusedCard = 'Rechazadas !';
    this.pendingCard = 'Pendientes !';
    this.regularizedLenCard = this.pieDataJson.data[0];
    this.refusedLenCard = this.pieDataJson.data[1];
    this.pendingLenCard = this.pieDataJson.data[2];
    this.disableRt.profileRoot[0] = JSON.parse(localStorage.getItem('sales_module'));
    this.disableRt.profileRoot[1] = JSON.parse(localStorage.getItem('fees_module'));
    this.disableRt.profileRoot[2] = JSON.parse(localStorage.getItem('batches_module'));
    this.disableRt.profileRoot[3] = JSON.parse(localStorage.getItem('profiles_module'));

    this.flagSession = localStorage.getItem('logged_');
    /*console.log('soy-PRUEBITA-HISTORY: ');
    console.log(window.history);
    console.log(window.history.length);
    console.log(window.history.state.navigationId);*/
    //this.checkHistory();
    
    /* FUNCIONES VALIDADORAS DE SEWSIÓN */
    //this.checkHistory();
    //this.checkToken();
    //this.validateSessionDevice();

    /*let testUser = JSON.parse( localStorage.getItem('dataUserProfile') );
    console.log('SOY-TEST-CONSTRUCTOR-HOME:');
    console.log(testUser);
    console.log(testUser); */

    /*let today = new Date();
    window.name = 'w' + today.getTime();
    console.log('HOME-HISTORY-SESSION: ');
    console.log(window.name);*/
    //this.checkCookie();
    //this.setCookie('serv','',30);

    if(localStorage.getItem('logged_username') != null){
      console.log('VARIABLE GLOBAL-TRUE: ');
      this.disableRt.refreshSession = true;
    }
    setInterval( ()=>{ this.checkStorage(); }, 500);
  }


  ngOnInit() {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
      this.pieChartData = this.pieData;
   
  }

  valuechange(newValue) {
    this.mymodel = newValue;
    console.log(newValue)
  }

  goBrowsePage(){
    this.router.navigate(['/browse']);
  }

  goComissionPage(){
    this.router.navigate(['/fee']);
  }

  goBatchPage(){
    this.router.navigate(['/browseBatch']);
  }

  checkFlagUser(){
    if(this.loggedUsername === 'guzmanmauc'){
      this.checkATag[0] = true;
    } else if(this.loggedUsername === 'sdiaz'){
      this.checkATag[1] = true;
      this.checkATag[2] = true;
    } else if(this.loggedUsername === 'arosario'){
      this.checkATag[1] = true;
      this.checkATag[2] = true;
    } else if(this.loggedUsername === 'hzambrano'){
      this.checkATag[1] = true;
    }
  }

  loadFlagUser(){
    let p;
    for(p=0; p<3; p++){
      this.checkATag[p] = false;
    }
  }

  logout(){
    localStorage.removeItem('logged_username');
    this.disableRt.refreshSession = false;
    this._authService.logout();

  /*  this._heroesService.getUsuarios()
    .toPromise().then(data => {
      console.log('SOY HOME-LOGOUT: ');
      console.log(data);
    });*/
  }


  onChartClick(event) {
      console.log(event);
  }

  public isEmpty(str:string) {
    return (!str || 0 === str.length);
  }


/*  public setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.getDate();
    document.cookie = cname + "=" + cvalue + ";" + expires;
  }


  public checkCookie() {
    var user=this.getCookie("username");
    if (user != "") {
        console.log('SOY-HOME-COOKIE-LLENO: ');
        console.log(user);
    } else {
      console.log('SOY-HOME-COOKIE-VACIO: ');
      console.log(user);
      localStorage.removeItem('logged_username');
      this.disableRt.disableRoot = false;
      this.router.navigate(['/login']);
      /* user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
  }


  public getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  } */

  public checkStorage(){
    if(localStorage.getItem('logged_username') == null){
      this.disableRt.disableRoot = false;
      this.router.navigate(['/login']);
    } else{
    }
  }


  /*public checkStorageCopy(){
    if(localStorage.getItem('logged_username') != null){
      //this.disableRt.disableRoot = false;
      //this.router.navigate(['/login']);
      console.log('SOY-CHECK-STORAGE-COPY');
      console.log('ya-haY-SESION-INICIADA!!');
    } else{
    }
  }

  public setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.getDate();
    document.cookie = cname + "=" + cvalue + ";" + expires;
  }


  public setCookieApp(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.getDate();
    document.cookie = cname + "=" + cvalue + ";" + expires;
  }


  public checkCookie2() {
    var user=this.getCookie("app");
    if (user != "") {
        console.log('SOY-HOME-COOKIE2-LLENO: ');
        console.log(user);
    } else {
      console.log('SOY-HOME-COOKIE2-VACIO: ');
      console.log(user);
      //localStorage.removeItem('logged_username');
      //this.disableRt.disableRoot = false;
      //this.router.navigate(['/login']);
      /* user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }*/
  //  }
 // }


  /*public checkCookie() {
    var user=this.getCookie("serv");
    if (user != "") {
        console.log('SOY-HOME-COOKIE-LLENO: ');
        this.setCookieApp('app','w2',30);
        console.log(user);
    } else {
      console.log('SOY-HOME-COOKIE-VACIO: ');
      console.log(user);
    } 
  }*/

  public checkHistory() {
    if(window.history.state.navigationId == 1){      
      //console.log('soy-HOMEckeck-HISTORY: ');
      //console.log(window.history.state.navigationId);
      //window.history.state.navigationId == 0;
      this.disableRt.disableRoot = false;
      this.router.navigate(['/login']);
    } 
  }


  public checkToken(){
    let homeToken = '';
    let accessToken = '';
    if(this.isEmpty(localStorage.getItem('home_token')))
      localStorage.setItem('home_token','');
    homeToken = localStorage.getItem('home_token');
    accessToken = localStorage.getItem('access_token');
    //console.log('soy-HOME-FUNCTION-TOKEN: ');
    //console.log(homeToken);
    //console.log(accessToken);
    
    if(homeToken != ''){
      if((homeToken != accessToken)){
        //console.log('soy-HOME-ckeck-TOKEN: ');
        localStorage.setItem('access_token', localStorage.getItem('home_token'));
        this.disableRt.disableRoot = false;
        this.router.navigate(['/login']);
      }

    } else{
      localStorage.setItem('home_token', accessToken);
    }
  }

  public detectDevice(){
    let typeDev = 0; 
    if (/Mobi/.test(navigator.userAgent)) {
      // mobile!
      typeDev = this.typeDevice = 1;
      //this.showAlert('SOY-DISPOSITIVO-MOBIL!');
      //console.log('SOY-DISPOSITIVO-MOBIL!');
    } else{
      typeDev = this.typeDevice = 0;
      //this.showAlert('NO-SOY-DISPOSITIVO-MOBIL!');
      //console.log('NO-SOY-DISPOSITIVO-MOBIL!');
    }
    return typeDev;
  }

  showAlert(message){
    if(window.confirm(message)){
        console.log('ACEPTÓ - CLIENTE');
    } else{
        console.log('DECLINÓ - CLIENTE');
    }
  }

  public detectIPClient(){
    console.log('SOY-DETECT-FU9NCTION:');
    console.log(window['ip_local']);
    return window['ip_local'];
  }



  public validateSessionDevice(){
    if(this.isEmpty(localStorage.getItem('logged_username'))){

    } else {

      if(this.detectDevice() == 0){
        if(this.isEmpty(localStorage.getItem('ipPCMachine'))){
          this.ipPCMachine = this.detectIPClient();
          localStorage.setItem('ipPCMachine', this.ipPCMachine);
        } else{
          let ipPCMachineOld = localStorage.getItem('ipPCMachine');
          let ipPCMachineNew = this.detectIPClient();
          if((this.detectDevice() == 0) && (ipPCMachineNew != ipPCMachineOld)){
            this.disableRt.disableRoot = false;
            this.router.navigate(['/login']);
          }
        }

      } else{
        if(this.isEmpty(localStorage.getItem('ipCellPhone'))){
          this.ipCellPhone = this.detectIPClient();
          localStorage.setItem('ipCellPhone', this.ipCellPhone);
        } else{
          let ipCellPhoneOld = localStorage.getItem('ipPCMachine');
          let ipCellPhoneNew = this.detectIPClient();
          if((this.detectDevice() == 1) && (ipCellPhoneNew != ipCellPhoneOld)){
            this.disableRt.disableRoot = false;
            this.router.navigate(['/login']);
          }
        }

      }
    }
  }

  /*detectIPClient(){
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
    var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
    pc.createDataChannel("");    //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
    pc.onicecandidate = function(ice){  //listen for candidate events
        if(!ice || !ice.candidate || !ice.candidate.candidate)  return;
        var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
        document.write('IP: ', myIP);   
        pc.onicecandidate = noop;
    };
  }*/


  /*public checkCookieApp() {
    var user=this.getCookie("app");
    if (user != "") {
        console.log('SOY-HOME-app-COOKIE-LLENO: ');
        //this.setCookieApp('app','w2',30);
        console.log(user);
    } else {
      console.log('SOY-HOME-COOKIE-VACIO: ');
      this.router.navigate(['/login']);
    } 
  }


  public getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }*/


}
