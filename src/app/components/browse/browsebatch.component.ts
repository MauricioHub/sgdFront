import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
//import { Browse } from "../../interfaces/browse.interface";
import { HeroesService } from "../../services/heroes.service";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-browsebatch',
  templateUrl: './browsebatch.component.html',
  styles: []
})
export class BrowsebatchComponent implements OnInit {

  batchIdentifier:string = "";
  orderIdentifier:string = "";  
  firstDate1; lastDate1;
  estados:any[] = [
    {id: "", status: ""},
    {id: "1", status: "PENDIENTE"},
    {id: "2", status: "REGULARIZADO"},
    {id: "3", status: "RECHAZADO"}
  ];

  paymentType:any[] = [];
  selectedPaymentType:any = {idPayment: "" , description: ""};

  oficinas:any[] = [{officeId: "", officeName: ""}];
  selectedOficina:any = {officeId: "", officeName: ""};
  selectedEstado:any = {id: "", status: ""};


  constructor(private _heroesService: HeroesService,
              private router:Router,
              private route:ActivatedRoute,
              private _authService:AuthService ){
      this.chargeOffices("");
      this.chargePayments();

  }

  ngOnInit() {
  }


  browseParameters(){

    let firstDate='', lastDate = '';
    firstDate = JSON.stringify( this.firstDate1 );
    lastDate = JSON.stringify( this.lastDate1 );
 
    if(this.isEmpty(firstDate))
      firstDate = '';
    else
      firstDate = '' + this.firstDate1.day + '/' + this.firstDate1.month + '/' + this.firstDate1.year;

    if(this.isEmpty(lastDate))
      lastDate = '';
    else
      lastDate = '' + this.lastDate1.day + '/' + this.lastDate1.month + '/' + this.lastDate1.year;

    this._heroesService.browseBatch( firstDate,
                                     lastDate,
                                     this.batchIdentifier,
                                     this.orderIdentifier,
                                     this.selectedOficina.officeId,
                                     this.selectedPaymentType.description,
                                     this.selectedEstado.status                                     
                                    )
    .subscribe( data=>{
        if(data)
         console.log(data);
         //this.router.navigate(['/heroe']);
    });

  }

  
  chargeOffices(selectedCanal){
    let officeEmpty = {officeId: "", officeName: ""};

    this._heroesService.chargeOffices( 
          selectedCanal                                     
    )
    .toPromise().then(data => {
      data.push(officeEmpty);
      this.oficinas = data;
    });
  }


  chargePayments(){
    let paymentEmpty = {idPayment: "" , description: ""};

    this._heroesService.chargePayments()
    .toPromise().then(data => {
      data.push(paymentEmpty);
      this.paymentType = data;
    });
  }


  logout(){
    this._authService.logout();
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  public isEmpty(str:string) {
    return (!str || 0 === str.length);
  }

}
