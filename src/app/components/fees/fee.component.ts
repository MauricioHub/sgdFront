import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HeroesService } from "../../services/heroes.service";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styles: []
})
export class FeeComponent implements OnInit {

  requestId:string = "";
  sellerId:string = "";
  startDate; endDate;

  canales:any[] = [
    {id: "", name: "todos"},
    {id: "AGE", name: "AGENCIA"},
    {id: "CAC", name: "CENTROS DE ATENCION AL CLIENTE"},
    {id: "CAD", name: "CENTROS DE ATENCION A DISTRIBUIDORES"},
    {id: "CAL", name: "CALL CENTER GYE"},
    {id: "DAT", name: "DATUM"},
    {id: "DIS", name: "DISTRIBUIDORES"},
    {id: "FER", name: "FERIA CENTRO DE EXPOSICIONES"},
    {id: "MAT", name: "MATRIZ PRINCIPAL"},
    {id: "MTR", name: "MATRIZ"},
    {id: "OMV", name: "OFICINA MOVIL"},
    {id: "PYM", name: "PYMES"},
    {id: "RET", name: "RETAILERS"},
    {id: "SOL", name: "SOLUCIONES EMPRESARIALES"},
    {id: "SUB", name: "SUBSIDIARIAS"},
    {id: "SUC", name: "SUCURSAL"}
  ];

  selectedCanal:any = {id: "" , name: ""};
  channels:any[] = [{channelId: "", description: ""}];
  selectedChannel:any = {channelId: "", description: ""};

  sellers:any[] = [{sellerId: "", sellerName: ""}];
  selectedSeller:any = {sellerId: "", sellerName: ""};

  penalties:any[] = [
    {penaltyId: "", description: "todos"},
    {penaltyId: "2", description: "NO ENTREGA"},
    {penaltyId: "3", description: "FUERA DE TIEMPO"}
  ];
  selectedPenalty:any = {penaltyId: "", description: ""};

  constructor(private _heroesService: HeroesService,
              private router:Router,
              private route:ActivatedRoute,
              private _authService:AuthService ){

      this.selectedCanal = {id: "CAC", name: "CENTROS DE ATENCION AL CLIENTE"};
      this.chargeSellers();
      this.chargeChannels();
    //  this.chargePenalties();          
  }

  ngOnInit() {
  }

  browseComission(){
    let firstDate = JSON.stringify( this.startDate );
    let lastDate = JSON.stringify( this.endDate );
    if(this.isEmpty(firstDate))
      firstDate = '';
    else
      firstDate = '' + this.startDate.day + '/' + this.startDate.month + '/' + this.startDate.year;

    if(this.isEmpty(lastDate))
      lastDate = '';
    else
      lastDate = '' + this.endDate.day + '/' + this.endDate.month + '/' + this.endDate.year;

    this._heroesService.browseComission(this.selectedChannel.channelId,
                                        this.selectedSeller.sellerId,
                                        this.selectedPenalty.description,
                                        firstDate,
                                        lastDate                                     
                                      )
    .subscribe( data=>{
        if(data)
         console.log('SOY RESPONSE COMPONENT');
    }); 
  }


  logout(){
    this._authService.logout();
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  chargeChannels(){
    let channelEmpty = {channelId: "", description: "todos"};

    this._heroesService.chargeChannels()
    .toPromise().then(data => {
      data.push(channelEmpty);
      this.channels = data;
    });
  }

  chargeSellers(){
    let sellerEmpty = {sellerId: "", sellerName: "todos"};

    this._heroesService.chargeSellers()
    .toPromise().then(data => {
      data.push(sellerEmpty);
      this.sellers = data;
    });
  }

  chargePenalties(){
    let penaltyEmpty = {penaltyId: "", description: "todos"};

    this._heroesService.chargePenalties()
    .toPromise().then(data => {
      data.push(penaltyEmpty);
      this.penalties = data;
    });
  }

  public isEmpty(str:string) {
    return (!str || 0 === str.length);
  }

}
