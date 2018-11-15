import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Globals } from '../../app.globals';
//import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  class:string = '';

  constructor(private router: Router,
              private authService:AuthService,
              private disableRt:Globals) { 

    /*  setInterval(function(refreshSession){
        /*if(!refreshSession){
          console.log('soy-ALERT-NOIF: ');
          //this.router.navigate(['/login']);
        } --
        
      }, 2000, this.disableRt.refreshSession);*/                  
  }

  ngOnInit() {
    if(localStorage.getItem("access_token")!=null){
    this.router.navigate(['/home']);
    }
  }

  login(formulario:NgForm){
    let login2:any;

    if(formulario.status=="INVALID"){
      this.class='was-validated';
    }else{
      console.log(formulario.value.username);
      console.log('SOY LOGIN1-COMPONENT: ');

      this.authService.login2(formulario.value.username,formulario.value.password);
      //.subscribe(res => {});
    }
  }

}
