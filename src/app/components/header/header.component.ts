import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Globals } from '../../app.globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:string = '';
  _auth: any;
  enableSalesModule:boolean= false;
  enableFeesModule:boolean= false;
  enableBatchesModule:boolean= false;
  enableProfilesModule:boolean= false;

  constructor(_auth:AuthService,
              private disableRt:Globals) {
    this._auth = _auth;
    this.username = localStorage.getItem('logged_username');
    console.log('SOY HEADER-MODULE: ');
    this.disableRt.profileRoot[0] = JSON.parse(localStorage.getItem('sales_module'));
    this.disableRt.profileRoot[1] = JSON.parse(localStorage.getItem('fees_module'));
    this.disableRt.profileRoot[2] = JSON.parse(localStorage.getItem('batches_module'));
    this.disableRt.profileRoot[3] = JSON.parse(localStorage.getItem('profiles_module'));

    //if(this.disableRt.profileRoot)
    if(this.disableRt.profileRoot[0].modulePr == true)
      this.enableSalesModule = true;
    if(this.disableRt.profileRoot[1].modulePr == true)
      this.enableFeesModule = true;
    if(this.disableRt.profileRoot[2].modulePr == true)
      this.enableBatchesModule = true;
    if(this.disableRt.profileRoot[3].modulePr == true)
      this.enableProfilesModule = true;
      
  /*  localStorage.setItem('sales_module', JSON.stringify(this.disableRt.profileRoot[0]));
    localStorage.setItem('fees_module', JSON.stringify(this.disableRt.profileRoot[1]));
    localStorage.setItem('batches_module', JSON.stringify(this.disableRt.profileRoot[2]));*/  
                
   /* console.log(this.disableRt.profileRoot[0]);
    console.log(this.disableRt.profileRoot[1]);
    console.log(this.disableRt.profileRoot[2]);*/
  }

  ngOnInit() {
    this.username = localStorage.getItem('logged_username');
   /* localStorage.setItem('sales_module', JSON.stringify(this.disableRt.profileRoot[0]));
    localStorage.setItem('fees_module', JSON.stringify(this.disableRt.profileRoot[1]));
    localStorage.setItem('batches_module', JSON.stringify(this.disableRt.profileRoot[2]));*/
  }

  logout(){
    this._auth.logout();
  }

}
