import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from "../interfaces/heroe.interface";
import { Fee } from "../interfaces/fee.interface";
import { environment } from '../../environments/environment';
import { environmentP } from '../../environments/environment.prod';
import { Router } from '@angular/router';
//import * as FileSaver from 'file-saver';
//import * as XLSX from 'xlsx';
import { filter, map } from 'rxjs/operators';

const API_COMISSION=environmentP.comissionURL;
const API_SALES=environmentP.browseURL;
const API_BROWSE_BATCH=environmentP.browseBatchURL;
const API_BATCH=environmentP.loteURL;
const API_REGULAR=environmentP.regularURL;
const API_SEQUENCE=environmentP.sequenceURL;

const API_LREASONS=environmentP.reasonsURL;
const API_LOFFICES=environmentP.officesURL;
const API_LSELLERS=environmentP.sellersURL;
const API_LPAYMENTS=environmentP.paymentsURL;
const API_LCHANNELS=environmentP.channelsURL;
const API_LPENALTIES=environmentP.penaltiesURL;

//const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//const EXCEL_EXTENSION = '.xls';

@Injectable()
export class HeroesService {
  
  heroesURL:string = "http://localhost:8086/salesRequest";
  heroeURL:string = "http://localhost:8083/regula/sale";
  saleURL:string = "http://localhost:8083/regula/sale";
  salesExcel:string = "http://localhost:8085/ExcelExport";

  browseURL:string = "http://10.225.13.18:9952/SalesInfo";

  browseBatchURL:string = "http://10.225.13.18:9954/LotInfo";
  loteURL:string = "http://10.225.13.18:9954/LotCreation";
  regularURL:string = "http://10.225.13.18:9954/LotUpdate";
  sequenceURL:string = "http://10.225.13.18:9954/GetSequence";

  comissionURL:string = "http://10.225.13.18:9953/ComissionsInfo";
  
  reasonsURL:string = "http://10.225.13.18:9956/GetReasons";
  officesURL:string = "http://10.225.13.18:9956/GetOffices";
  sellersURL:string = "http://10.225.13.18:9956/GetSellers";
  paymentsURL:string = "http://10.225.13.18:9956/GetPayments";
  channelsURL:string = "http://10.225.13.18:9956/GetChannels";
  penaltiesURL:string = "http://10.225.13.18:9956/GetPenalties";
  

  flagDelete:boolean = true;
  flagVentas:number = 1;
  heroeServ:any[] = [];
  comisionServ:any[] = [];
  batchServ:any[] = [];
  feesServ:any[] = [];

  testExcel:any[] = [];
  prueba: Object = {};
  
  constructor( private http:HttpClient,
               public router: Router ) { }


  public browseVenta( firstD:String, lastD:String, 
                      canal:String, ofic:String, 
                      lotId:string, status:string  ){
      console.log('SOY CONSOLE SERVER!!: ');
      console.log('fech ini: ' + firstD + ',');
      console.log('fech fin: ' + lastD  + ',');
      console.log('canal: ' + canal  + ',');
      console.log('ofic: ' + ofic  + ',');
      console.log('lot: ' + lotId  + ',');
      console.log('estado: ' + status  + '');

      let templateDate:string = "" + firstD;
      let templateDate2:string = "" + lastD;
      let varCanal:string = "" + canal;
      let varOfic:string = "" + ofic;
      let varLotId:string = "" + lotId;
      let varStatus:string = "" + status; 

      localStorage.setItem('s_firstD', templateDate);
      localStorage.setItem('s_lastD', templateDate2);
      localStorage.setItem('s_idCanal', varCanal);
      localStorage.setItem('s_idOficina', varOfic);
      localStorage.setItem('s_idLote', varLotId);
      localStorage.setItem('s_idStatus', varStatus);

      let body = {
        order:"",
        startDate:templateDate,
        endDate:templateDate2,
        officceId:varOfic,
        channelId:varCanal,
        lotId:varLotId,
        status:varStatus
      };

      let headers = new HttpHeaders({
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'      
      });  

      return this.http.post( API_SALES, body, { headers }  )     
      .pipe(
        map((res:any) => {
          console.log(res);
          this.flagVentas = 2;
          localStorage.setItem('s_records', (res).records);
          this.heroeServ = (res).salesResult;
          return (res).salesResult;
          //this.router.navigate(['/sales']);             
        })
      );
  }
  
  getBrowseHeroes(){
    return this.heroeServ;
  }


  public browseVentaAsync( firstD:String, lastD:String, 
                           canal:String, ofic:String, 
                           batch:string, status:string ){
    let templateDate:string = "" + firstD;
    let templateDate2:string = "" + lastD;
    let varCanal:string = "" + canal;
    let varOfic:string = "" + ofic;
    let varBatch:string = "" + batch;
    let varStatus:string = "" + status; 

    let body = {
      order:"",
      startDate:templateDate,
      endDate:templateDate2,
      officceId:varOfic,
      channelId:varCanal,
      lotId:varBatch,
      status:varStatus
    };

    let headers = new HttpHeaders({
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'      
    });

    return this.http.post( API_SALES, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          localStorage.setItem('vE_records', (res).records);
          this.heroeServ = (res).salesResult;
          return (res).salesResult;          
        })
      );
  }



  public browseComission( canal:string, sellerId:string,
    penaltyId:string,
    startDate:string,
    endDate:string ){

    let templateCanal:string = "" + canal;                
    let templateSeller:string = "" + sellerId;
    let templatePenalty:string = "" + penaltyId;
    let templateStDate:string = "" + startDate;
    let templateEnDate:string = "" + endDate; 

    if(templatePenalty == 'todos')
    templatePenalty = '';

    let body = {
    channelId: templateCanal,
    sellerId: templateSeller,
    penaltyId: templatePenalty,
    startDate: templateStDate,
    endDate: templateEnDate      
    };

    let headers = new HttpHeaders({
    'Accept':'application/json',
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*'      
    });

    return this.http.post( API_COMISSION, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          console.log("SOY SERVER COMISSION: ");
          console.log(res);          
          localStorage.setItem('f_records', (res).records);
          return (res).comission;
          //this.router.navigate(['/fees']);          
        })
      );
  }

  getBrowseComisiones(){
      return this.feesServ;
  }


  browseBatch( firstD:String, lastD:String, 
                batchIdentifier:String, orderIdentifier:String, 
                officce:string, paymentType:string, status:string
              ){
    let templateDate1:string = "" + firstD;
    let templateDate2:string = "" + lastD;
    let templateBatch:string = "" + batchIdentifier;
    let templateOrder:string = "" + orderIdentifier;
    let varOfficce:string = "" + officce;
    let varPayment:string = "" + paymentType;
    let varStatus:string = "" + status; 

    localStorage.setItem('b_lotId', templateBatch);
    localStorage.setItem('b_startDate', templateDate1);
    localStorage.setItem('b_endDate', templateDate2);
    localStorage.setItem('b_orderId', templateOrder);
    localStorage.setItem('b_salesChannel', varOfficce);
    localStorage.setItem('b_paymentType', varPayment);
    localStorage.setItem('b_statusId', varStatus);

    let body = {
      lotId:templateBatch,
      startDate:templateDate1,
      endDate:templateDate2,
      orderId:templateOrder,
      customerId:"",
      salesChannel:varOfficce,
      paymentType:varPayment,
      financialInstitution:"",
      status:varStatus
    };

    let headers = new HttpHeaders({
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'      
    });
    
    console.log('SOY SERVER bATCH: ');
    console.log(body);

    return this.http.post( API_BROWSE_BATCH, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          console.log(res);
          this.flagVentas = 2;
          this.batchServ = (res).lotResults;
          localStorage.setItem('v_lotId', (res).lotId);
          localStorage.setItem('v_lotDate', (res).lotDate);
          localStorage.setItem('b_records', (res).records);
        //  this.router.navigate(['/batches']);
          return (res).lotResults;
        })
      );
    }

  getBrowseBatch(){
    return this.batchServ;
  }


  public browseBatchAsync( firstD:String, lastD:String, 
                          batchIdentifier:String,
                          orderIdentifier:String, 
                          officce:string,
                          paymentType:string,
                          status:string
                          ){
    let templateDate1:string = "" + firstD;
    let templateDate2:string = "" + lastD;
    let templateBatch:string = "" + batchIdentifier;
    let templateOrder:string = "" + orderIdentifier;
    let varOfficce:string = "" + officce;
    let varPayment:string = "" + paymentType;
    let varStatus:string = "" + status; 

    let body = {
      lotId:templateBatch,
      startDate:templateDate1,
      endDate:templateDate2,
      orderId:templateOrder,
      customerId:"",
      salesChannel:varOfficce,
      paymentType:varPayment,
      financialInstitution:"",
      status:varStatus
    };

    let headers = new HttpHeaders({
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'      
    });

    return this.http.post( API_BROWSE_BATCH, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          this.batchServ = (res).lotResults;
          localStorage.setItem('v_lotId', (res).lotId);
          localStorage.setItem('v_lotDate', (res).lotDate);
          localStorage.setItem('v_records', (res).records);
          return (res).lotResults;
        })
      );
  }

  public getBatchSequenceAsync() {
    return this.http.get( API_SEQUENCE )
    .pipe(
      map( res=>res)
    );
  }


  
  
  public nuevoLote( objLote ){
    let body = JSON.stringify( objLote );
    let headers = new HttpHeaders({
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'      
    });
    
    return this.http.post( API_BATCH, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          return res;
        })
      );
  }


  public nuevoRegular( objRegular ){

    let body = JSON.stringify( objRegular );
    let headers = new HttpHeaders({
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*'      
    });
    
    console.log('NUEVO REGULAR: ');
    console.log(objRegular);
    return this.http.post( API_REGULAR, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          if((res).code == 200){
            //console.log('SERV-200: ');
            //console.log(res);
          }
          return res;
          //console.log(res);
        })
      );
  }


  chargeOffices(canal){
    let varCanal:string = "" + canal; 
    let body = {
      channelId:varCanal
    };

    let headers = new HttpHeaders({
       'Accept':'application/json',
       'Content-Type':'application/json',
       'Access-Control-Allow-Origin':'*'      
    });    
 
    return this.http.post( API_LOFFICES, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          console.log(res);
          return res.officeResults;          
        })
      );

  }


  chargeReasons(reason){
    let varReason:string = "" + reason; 
    let body = {
      reason:varReason
    };

    let headers = new HttpHeaders({
       'Accept':'application/json',
       'Content-Type':'application/json',
       'Access-Control-Allow-Origin':'*'      
    });    
 
    return this.http.post( API_LREASONS, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          //console.log(res.json());
          return res;          
        })
      );

  }


  chargeSellers(){
    let varSeller:string = ""; 
    let body = {
      sellerId:varSeller
    };

    let headers = new HttpHeaders({
       'Accept':'application/json',
       'Content-Type':'application/json',
       'Access-Control-Allow-Origin':'*'      
    });    
 
    return this.http.post( API_LSELLERS, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          console.log(res);
          return res.sellerResults;          
        })
      );
  }

  chargePayments(){
    let varPayment:string = ""; 
    let body = {
      paymentId:varPayment
    };

    let headers = new HttpHeaders({
       'Accept':'application/json',
       'Content-Type':'application/json',
       'Access-Control-Allow-Origin':'*'      
    });    
 
    return this.http.post( API_LPAYMENTS, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          console.log(res);
          return res.paymentResult;          
        })
      );
  }


  chargeChannels(){
    let varChannel:string = ""; 
    let body = {
      channelId:varChannel
    };

    let headers = new HttpHeaders({
       'Accept':'application/json',
       'Content-Type':'application/json',
       'Access-Control-Allow-Origin':'*'      
    });    
 
    return this.http.post( API_LCHANNELS, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          console.log(res);
          return res.channelResults;          
        })
      );
  }


  chargePenalties(){
    let varPenalty:string = ""; 
    let body = {
      penaltyId:varPenalty
    };

    let headers = new HttpHeaders({
       'Accept':'application/json',
       'Content-Type':'application/json',
       'Access-Control-Allow-Origin':'*'      
    });    
 
    return this.http.post( API_LPENALTIES, body, { headers }  )
      .pipe(
        map( (res:any)=>{
          console.log(res);
          return res.penaltiesResults;          
        })
      );
  }
}
