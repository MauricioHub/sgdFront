import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HeroesService } from "../../services/heroes.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ExcelService } from "../../services/excel.service";
//import * as jsPDF from 'jspdf';
//import * as atTable from 'jspdf-autotable';  
//import html2canvas from 'html2canvas';  
//import { environment } from '../../../environments/environment';
import { Fee } from "../../interfaces/fee.interface";
import {FormControl, FormGroup} from '@angular/forms';
import { Globals } from '../../app.globals';

declare var jsPDF: any;

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  loading:boolean = true;
  radioDis: boolean = false;
  radioAct: boolean = true;
  cardFlag: boolean = false;
  loggedUsername: string = "";
  v_records = '';
  startDate; endDate;
  startDateStr = '';
  startDateLng = 0;
  endDateStr = '';
  endDateLng = 0;
  rowIndex=1;

  fees:any[] = [];
  rows:any[] = [];
  columns:any[] = [];
  cols: any[];

  channels:any[] = [{channelId: "", description: ""}];
  selectedChannel:any = {channelId: "", description: ""};

  sellers:any[] = [{sellerId: "", sellerName: ""}];
  selectedSeller:any = {sellerId: "", sellerName: ""};

  penalties:any[] = [
    {penaltyId: "", description: "todos"},
    {penaltyId: "2", description: "NO ENTREGA"},
    {penaltyId: "3", description: "FUERA DE TIEMPO"},
    {penaltyId: "3", description: "ENTREGA A TIEMPO"},
  ];
  selectedPenalty:any = {penaltyId: "", description: ""};
  //records:string[] = [];

  /*data: any = [{
    id: 'e101',
    name: 'mauricio',
    salarY: 1000
    },{
    id: 'e102',
    name: 'arosario',
    salarY: 2000
    },{
    id: 'e103',
    name: 'sdiaz',
    salarY: 3000
    },
    {
      id: 'e104',
      name: 'anoboa',
      salarY: 10000
    }]; */


  constructor(private _heroesService:HeroesService,
              private router:Router,
              private route:ActivatedRoute,
              private _authService:AuthService,
              private _datePipeService:DatePipe,
              private _excelService:ExcelService,
              private disableRt:Globals) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
      
    this.disableRt.profileRoot[0] = JSON.parse(localStorage.getItem('sales_module'));
    this.disableRt.profileRoot[1] = JSON.parse(localStorage.getItem('fees_module'));
    this.disableRt.profileRoot[2] = JSON.parse(localStorage.getItem('batches_module'));

        //this.fees = this._heroesService.getBrowseComisiones();
        this.fees = [];
        this.formatDateReport();
        this.loading = false;
        this.loggedUsername = localStorage.getItem('logged_username');
        this.v_records = localStorage.getItem('vE_records');
        if(this.fees.length == 0)
          this.v_records = '0';

        this.cardFlag = false;

        this.cols = [
            { field: 'locationId', header: 'Ubicación' },
            { field: 'sellerName', header: 'Vendedor' },
            { field: 'sellerId', header: 'Identificación' },
            { field: 'customerName', header: 'Cliente' },
            { field: 'customerId', header: 'Ced. Cliente' },
            { field: 'activationDate', header: 'Fecha Activación' },
            { field: 'device', header: 'Equipo' },
            { field: 'penalty', header: 'Comisión' },
            { field: 'comissionValue', header: 'Multa Aplicada' }

        ];
        this.chargeSellers();
        this.chargeChannels();  
       // console.log('SOY FEES COMP');
       // console.log(this.fees);
  }

  ngOnInit() {
    this.fees = [];
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;      
  }

  startDateBrowse(newStartDate){
    if(!this.isEmpty(this.startDate.day)){
      this.startDate = newStartDate;
      this.startDateStr = this.jsonDateToString(this.startDate);
      this.startDateStr = this.formatDate(new Date(this.startDateStr));
      this.startDateLng = this.strDateToLong(this.startDateStr);
      if(this.isEmpty(this.endDate)){
        this.browseParameters();
      } else{
        this.endDateStr = this.jsonDateToString(this.endDate);
        this.endDateStr = this.formatDate(new Date(this.endDateStr));
        this.endDateLng = this.strDateToLong(this.endDateStr);
        if(this.startDateLng <= this.endDateLng)
          this.browseParameters();
        else
          this.showAlert('RANGO FECHAS INVALIDAS!');
      }
    }      
  }

  endDateBrowse(newEndDate){
    if(!this.isEmpty(this.startDate.day)){
      this.endDate = newEndDate;
      this.endDateStr = this.jsonDateToString(this.endDate);
      this.endDateStr = this.formatDate(new Date(this.endDateStr));
      this.endDateLng = this.strDateToLong(this.endDateStr);

      if(this.isEmpty(this.startDate)){
        this.browseParameters();
      } else {
        this.startDateStr = this.jsonDateToString(this.startDate);
        this.startDateStr = this.formatDate(new Date(this.startDateStr));
        this.startDateLng = this.strDateToLong(this.startDateStr);
        if(this.startDateLng <= this.endDateLng)
          this.browseParameters();
        else
          this.showAlert('RANGO FECHAS INVALIDAS!');
      }
    }  
  }

  jsonDateToString(time){
    let newDate = '' + time.month + '/' + time.day + '/' + time.year;
    return newDate;
  }
  
  strDateToLong(timeStr){
    let newDate = new Date(timeStr).valueOf();
    return newDate;
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

  browseParameters(){
    let firstDate, lastDate;
    if(this.startDate === '')
      firstDate = '';
    else
      firstDate = JSON.stringify( this.startDate );

    if(this.endDate === '')
      lastDate = '';
    else
      lastDate = JSON.stringify( this.endDate );

    if(this.endDate === '')
      lastDate = '';
    else
      lastDate = JSON.stringify( this.endDate );

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
    .toPromise().then(data => {                                  
        if(data){
          this.fees = data;
          this.v_records = localStorage.getItem('f_records');
          if(this.fees.length == 0)
            this.v_records = '0';
        }
        //console.log('SOY RESPONSE COMPONENT');
    }); 
  }


  formatDate(date) {   
    return this._datePipeService.transform(date, 'yyyy-MM-dd');   
  }

  formatDateReport(){
    let lfees = this.fees.length;
    let q;
    if(lfees >=1 ){
      for(q=0; q<lfees; q++){
        this.fees[q].activationDate = 
        this.isEmpty(this.fees[q].activationDate)? '' : this.formatDate(new Date(this.fees[q].activationDate));
        
        this.fees[q].inconsistencyDate = 
        this.isEmpty(this.fees[q].inconsistencyDate)? '' : this.formatDate(new Date(this.fees[q].inconsistencyDate));

        this.fees[q].registerDate = 
        this.isEmpty(this.fees[q].registerDate)? '' : this.formatDate(new Date(this.fees[q].registerDate));
        
        this.fees[q].regularizationDate =
        this.isEmpty(this.fees[q].regularizationDate)? '' : this.formatDate(new Date(this.fees[q].regularizationDate));
      } 
    }
  }

  showAlert(message){

    if(window.confirm(message)){
      console.log('ACEPTÓ - CLIENTE');
    } else{
      console.log('DECLINÓ - CLIENTE');
    }
  }

  public isEmpty(str:string) {
    return (!str || 0 === str.length);
  }

  public exportToExcel(){
    let fees:any[] = [];
    fees = this.setHeaderFeesExcel();
    this._excelService.exportAsExcelFile(fees, 'comisiones');    
  
  }

/*  public captureScreen(){  
    var data = document.getElementById('tablefee');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('l', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('comisiones.pdf'); // Generated PDF   
    });  
  }

  public mydownloadPDF(){
    let doc = new jsPDF('l', 'pt', 'a4');
    let margins = {
      top: 0,
      bottom: 0,
      left: 10,
      width: 850,
      height: 360
    };

    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(
      content.innerHTML, // HTML string or DOM elem ref.
      margins.left,
      margins.top, {
        'width': margins.width
        //'elementHandlers': specialElementHandlers
      },
      function(dispose) {
        doc.save('comisionesjspdf.pdf');
      }, margins);
    //doc.save('comisionesjspdf.pdf');
  }*/

  public downloadPDF(){
    let lenFees = this.fees.length;
    let p;

    this.columns = [
      'Signat ?', '1ra. Vez',
      'Nro. Orden', 'Cod.', 
      'Vendedor', 'Localidad', 
      'Cliente', 'No. Identificación',
      'Plan', 'Cuenta', 
      'Fec. Ingreso', 'Fec. Regulariza', 
      'U. Regula', 'Equipo', 
      'Telefs', 'Fec. Activacion', 
      'Fec. Inconsis', 'U. Inconsis', 
      'Inconsistencia', 'Penal', 
      'Multa'
    ];
    this.rows = [];


    for(p=0; p<lenFees; p++){
        let records = [
          this.fees[p].claroSignature === ''? '': (this.fees[p].claroSignature === 'S'? 'SI': 'NO'),
          this.fees[p].signatureFirstTime === ''? '': (this.fees[p].signatureFirstTime === 'S'? 'SI': 'NO'),
          this.fees[p].idOrder,
          this.fees[p].sellerId,
          this.fees[p].sellerName,
          this.fees[p].locationId,
          this.fees[p].customerName,
          this.fees[p].customerId,
          this.fees[p].plan,
          this.fees[p].account,
          this.formatDate(this.fees[p].registerDate),
          this.formatDate(this.fees[p].regularizationDate),
          this.fees[p].regularizationUser,
          this.fees[p].device,
          this.fees[p].quantity,
          this.formatDate(this.fees[p].activationDate),
          this.formatDate(this.fees[p].inconsistencyDate),
          this.fees[p].inconsistencyUser,
          this.fees[p].penalty,
          this.fees[p].penaltyValue,
          this.fees[p].comissionValue
        ];
        this.rows[p] = records;
    }
    let doc = new jsPDF('l', 'pt', 'legal');
    doc.autoTable(this.columns, this.rows,
      {
        headerStyles: {
          fillColor: [255, 0, 0],
          fontSize: 5
        },
        bodyStyles: {fontSize: 5},
        margin: {top: 60, left:5, right:5},
        addPageContent: function(data) {
          doc.text("Reporte Comisiones", 40, 30);
        }
    }); // typescript compile time error
    doc.save('ComisionesJSPDF.pdf');
  }


  private setHeaderFeesExcel(){
    let fees:any[] = [];
    let lenFees = this.fees.length;
    let p;

    for(p=0; p<lenFees; p++){
      let objFeesNew = {
        'Signature ??':this.fees[p].claroSignature === ''? '': (this.fees[p].claroSignature === 'S'? 'SI': 'NO'),
        '1era. Vez ??':this.fees[p].signatureFirstTime === ''? '': (this.fees[p].signatureFirstTime === 'S'? 'SI': 'NO'),
        'Código Vendedor':this.fees[p].sellerId,
        'Nombre Vendedor':this.fees[p].sellerName,
        'Localidad':this.fees[p].locationId,
        'Número Orden':this.fees[p].idOrder,
        'Nombre Cliente':this.fees[p].customerName,
        'Identificación Cliente':this.fees[p].customerId,
        'Tipo Plan':this.fees[p].plan,
        'Número Cuenta':this.fees[p].account,
        'Fecha Ingreso':this.formatDate(this.fees[p].registerDate),
        'Fecha Regularización':this.formatDate(this.fees[p].regularizationDate),
        'Usuario Regularización':this.fees[p].regularizationUser,
        'Equipo':this.fees[p].device,
        'Cantidad Teléfonos':this.fees[p].quantity,
        'Fecha Activación':this.formatDate(this.fees[p].activationDate),
        'Fecha Inconsistencia':this.formatDate(this.fees[p].inconsistencyDate),
        'Usuario Inconsistencia':this.fees[p].inconsistencyUser,
        'Inconsistencia':this.fees[p].penalty,
        'Penalización':this.fees[p].penaltyValue,
        'Multa Aplicada':this.fees[p].comissionValue
      };
      fees.push(objFeesNew);
    }
    return fees;
  }

  showBrowserCard(){
    this.cardFlag = true;
  }

  showThing(){
    if(this.cardFlag)
      this.cardFlag = false;
    else
      this.cardFlag = true;
    console.log('SOS UN GENIOR MAURICIO, EUREKA !!');
  }

  browseWhitoutParameters(){
    let firstDate = '', lastDate = '';
    this.selectedChannel = {channelId: "", description: ""};
    this.selectedSeller = {sellerId: "", sellerName: ""};
    this.selectedPenalty = {penaltyId: "", description: ""};
    this.startDate = '', this.endDate = '';

    this._heroesService.browseComission('',
                                        '',
                                        '',
                                        firstDate,
                                        lastDate                                     
                                      )
        .toPromise().then(data => {                                  
          if(data){
            this.fees = data;
            this.v_records = localStorage.getItem('f_records');
            if(this.fees.length == 0)
              this.v_records = '0';
          }
        //console.log('SOY RESPONSE COMPONENT');
        });
  }


}
