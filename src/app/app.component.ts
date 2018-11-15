import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from './app.globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  disableRoot:boolean;
  disableRt:Globals;

  constructor(private router: Router,
      private global:Globals){
    if(global.disableRoot){
    /*  this.disableRoot = true;
      this.router.navigate(['/login']);
      console.log('SOY APP-COMPONENT: ');
      console.log(global.disableRoot);*/
    } else{
    /*  this.disableRoot = false;
      this.router.navigate(['/home']);
      console.log('SOY APP-COMPONENT: ');
      console.log(global.disableRoot);*/
    }
   // this.ngOnInit();
      
    /*let token = ''; 
    let code = '';
    
    token = localStorage.getItem('access_token');    
    code = localStorage.getItem('code_temp');
    if(code == '200' && !this.isEmpty(token))
      this.disableRoot=true;
    /*else
      this.disableRoot=false;*/
    console.log('SOY CONSTRUCTOR: ');
    console.log(this.disableRoot);
  }

  ngOnInit(){
  //  this.disableRt.disableRoot = true;    
/*    let token = '';     
    let code = '';
    token = localStorage.getItem('access_token');
    code = localStorage.getItem('code_temp');
    if(code == '200' && !this.isEmpty(token))
      this.disableRoot=true;
    /*else
      this.disableRoot=false;*/
    /*  if(localStorage.getItem('disableRoot') == 'true'){
        this.disableRoot = true;
        this.router.navigate(['/login']);
        console.log('SOY APP-COMPONENT: ');
        console.log('TRUE');
      } else{
        this.disableRoot = false;
        this.router.navigate(['/home']);
        console.log('SOY APP-COMPONENT: ');
        console.log('FALSE');
      }*/

      console.log('SOY onINIT: ');
      console.log(this.disableRoot);
  }

  public isEmpty(str:string) {
    return (!str || 0 === str.length);
  }
}
