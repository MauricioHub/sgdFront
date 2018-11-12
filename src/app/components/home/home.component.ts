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
    this._authService.logout();
  }


  onChartClick(event) {
      console.log(event);
  }


}
