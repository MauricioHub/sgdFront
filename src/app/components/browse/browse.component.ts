import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HeroesService } from "../../services/heroes.service";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  firstDate1; lastDate1;
  lotId:string = "";

  canales:any[] = [
    {id: "", name: ""},
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

  estados:any[] = [
    {id: "", status: ""},
    {id: "1", status: "PENDIENTE"},
    {id: "2", status: "REGULARIZADO"},
    {id: "3", status: "RECHAZADO"}
  ];

  channels:any[] = [{channelId: "", description: ""}];
  selectedChannel:any = {channelId: "" , description: "todos"};

  selectedCanal:any = {id: "" , name: ""};
  oficinas:any[] = [{officeId: "", officeName: ""}];
  selectedOficina:any = {officeId: "", officeName: ""};
  selectedEstado:any = {id: "", status: ""};

  constructor(private _heroesService: HeroesService,
              private router:Router,
              private route:ActivatedRoute,
              private _authService:AuthService ){
    //this.oficinas = this.oficinasMat;
    this.selectedCanal = {id: "CAC", name: "CENTROS DE ATENCION AL CLIENTE"};
    this.chargeChannels();
    this.chargeOffices(this.selectedChannel.channelId);
  }

  ngOnInit() {
  }

  browseParameters(){

    let firstDate = JSON.stringify( this.firstDate1 );
    let lastDate = JSON.stringify( this.lastDate1 );
    if(this.isEmpty(firstDate))
      firstDate = '';
    else
      firstDate = '' + this.firstDate1.day + '/' + this.firstDate1.month + '/' + this.firstDate1.year;

    if(this.isEmpty(lastDate))
      lastDate = '';
    else
      lastDate = '' + this.lastDate1.day + '/' + this.lastDate1.month + '/' + this.lastDate1.year;

    this._heroesService.browseVenta( firstDate,
                                     lastDate,
                                     this.selectedChannel.channelId,
                                     this.selectedOficina.officeId,
                                     this.lotId,
                                     this.selectedEstado.status                                     
                                    );
   /* .subscribe( data=>{
        if(data)
         console.log(data);
    });*/
  }


  logout(){
    this._authService.logout();
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  onSelectionChange(selectedCanal){
    this.chargeOffices(selectedCanal.channelId);
  }


  chargeChannels(){
    let channelEmpty = {channelId: "", description: "todos"};

    this._heroesService.chargeChannels()
    .toPromise().then(data => {
      data.push(channelEmpty);
      this.channels = data;
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

  public isEmpty(str:string) {
    return (!str || 0 === str.length);
  }

}
