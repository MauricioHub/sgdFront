import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../../services/auth.service';
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
  mymodel;
  regularizedCard:string = '';
  refusedCard:string = '';
  pendingCard:string = '';

  // ADD CHART OPTIONS. 
  pieChartOptions = {
    responsive: true
  }

  pieChartLabels =  ['REGLR', 'RECHZ', 'PENDT'];

  // CHART COLOR. 'rgba(139, 136, 136, 0.9)', 'rgba(255, 161, 181, 0.9)' 
  //, 54, 77  data: [45, 67, 800, 500],
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

  chartData = [
    { data: [28], label: 'Account A' },
    { data: [9], label: 'Account B' },
    { data: [47], label: 'Account C' }
  ];

  pieData = [{ "data": [28, 9, 47] }];

  constructor(private router:Router,
              private _authService:AuthService,
              private httpService: HttpClient,
              private disableRt:Globals) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;             
    this.loggedUsername = localStorage.getItem('logged_username');
    this.loadFlagUser();
    this.checkFlagUser();
    this.regularizedCard = 'Regularizadas!';
    this.refusedCard = 'Rechazadas !';
    this.pendingCard = 'Pendientes !';
    console.log('SOY PROFILE-ROOT-HOME: ');
   // console.log(this.disableRt.profileRoot);
   
    this.disableRt.profileRoot[0] = JSON.parse(localStorage.getItem('sales_module'));
    this.disableRt.profileRoot[1] = JSON.parse(localStorage.getItem('fees_module'));
    this.disableRt.profileRoot[2] = JSON.parse(localStorage.getItem('batches_module'));
    this.disableRt.profileRoot[3] = JSON.parse(localStorage.getItem('profiles_module'));

    console.log(this.disableRt.profileRoot[0]);
    console.log(this.disableRt.profileRoot[1]);
    console.log(this.disableRt.profileRoot[2]);

  /*  localStorage.setItem('sales_module', JSON.stringify(this.disableRt.profileRoot[0]));
    localStorage.setItem('fees_module', JSON.stringify(this.disableRt.profileRoot[1]));
    localStorage.setItem('batches_module', JSON.stringify(this.disableRt.profileRoot[2]));*/
  }

  ngOnInit() {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
      this.pieChartData = this.pieData;

  /*  this.disableRt.profileRoot[0] = JSON.parse(localStorage.getItem('sales_module'));
    this.disableRt.profileRoot[1] = JSON.parse(localStorage.getItem('fees_module'));
    this.disableRt.profileRoot[2] = JSON.parse(localStorage.getItem('batches_module')); */
    /*  this.httpService.get('./assets/sales.json', {responseType: 'json'}).subscribe(
        data => {
            this.pieChartData = this.pieData;	 // FILL THE CHART ARRAY WITH DATA.
        },
        (err: HttpErrorResponse) => {
            console.log (err.message);
        }
    );*/
  }

/*  tempFunction(){
    this.disableRt.profileRoot[0] = JSON.parse(localStorage.getItem('sales_module'));
    console.log('SOY TEMP - FUNCTION: ');
    console.log(this.disableRt.profileRoot[0]);
    console.log(this.disableRt.profileRoot[1]);
    console.log(this.disableRt.profileRoot[2]);

  }*/

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
    this._authService.logout();
  }


  onChartClick(event) {
      console.log(event);
  }



}
