import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
//import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  class:string = '';
 
  constructor(private router: Router,
              private authService:AuthService) { }

  ngOnInit() {
    console.log(localStorage.getItem("username"));
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
