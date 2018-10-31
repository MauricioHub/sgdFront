import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
//import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-interface',
  template: `
  <div id="interface-login">
    <h1>SHOW TEMPLATE</h1>
  </div>
  `,
  styleUrls: []
})
export class InterfaceComponent implements OnInit {
 
  constructor(private router: Router,
              private authService:AuthService) { }

  ngOnInit() {
    console.log("SOY TEMPLATE!!!");
  }

}