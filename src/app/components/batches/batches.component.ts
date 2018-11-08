import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HeroesService } from "../../services/heroes.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ExcelService } from "../../services/excel.service";
//import * as jspdf from 'jspdf';  
//import html2canvas from 'html2canvas';
import { Batch } from "../../interfaces/batch.interface";
import {FormControl, FormGroup} from '@angular/forms';
import { Globals } from '../../app.globals';

declare var jsPDF: any;

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {

  heroes:any;
  loading:boolean = true;
  radioAct:boolean = false;
  radioActAll:boolean;
  flagUser:boolean = false;
  cardFlag: boolean = false;
  checkDis:boolean;
  //radioAct2:boolean[] = [];

  loggedUsername:string = "";
  checkBatches:boolean[] = [];
  enableBatches:boolean[] = [];
  batchSequence:number = 0;
  lotSequence = '';

  lotId;
  v_lotId:string = "";
  v_lotDate:string = "";
  v_records:string = "0";
  objRegular:any = {
    lotId: "",
    regularized_user: "", 
    regularizedDate: "",
    updateLotDetail: []
  };

  loteEstado:any[] = [
    {id: "PEN", name: "PENDIENTE"},
    {id: "REG", name: "REGULARIZADO"},
    {id: "REC", name: "RECHAZADO"}
  ];
  
  selectedLote:any[] = [{id: "" , name: ""}];
  selectedReason:any[] = [{idReason: "", description: ""}];

  batchIdentifier:string = "";
  orderIdentifier:string = "";  
  startDate; endDate;
  startDateStr = '';
  startDateLng = 0;
  endDateStr = '';
  endDateLng = 0;
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

  batches: any[] = [];
  batchRegular: Batch[] = [];
  batchObservation: string[] = [];
  radioActAr: boolean[] = [];
  selectReasonEn:boolean[] = [];
  flagUserEnable:boolean[] = [];
  batchReason: any[] = [];
  rows: any[] = [];
  columns: any[] = [];

  flagCheck:boolean = false;
  flagRegularize:boolean = false;
  flagRegularized:boolean = false;
  checkAllBox:boolean;
  radioDis: boolean = false;
  enableLotCreation:boolean = false;

  display = 'none';
  displayOK = 'none';
  mdBatchesLenght = '';
  model;

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
    //this.batches = this._heroesService.getBrowseBatch();
    if(!this.flagRegularized)
        this.batches = [];

    if(this.disableRt.profileRoot[2].modificacionCompletaPr || 
        this.disableRt.profileRoot[2].modificacionRestringidaPr)
        this.enableLotCreation = true;

    if(this.disableRt.profileRoot[2].modificacionRestringidaPr)
        this.flagUser = true;
    else
        this.flagUser = false;

    this.loading = false;
    this.radioActAll = false;
    this.checkAllBox = false;
    this.loggedUsername = localStorage.getItem('logged_username');
    /*if(this.loggedUsername == 'sdiaz')
    this.flagUser = true;*/

    this.v_lotId = localStorage.getItem('v_lotId');
    this.v_lotDate = localStorage.getItem('v_lotDate');
   // this.v_lotDate = this.formatDateReport(this.v_lotDate);
    this.v_records = localStorage.getItem('v_records');
    this.chargeOffices("");
    this.chargePayments();
    
    this.enableSelectReason(true);
   /* if(this.flagUser)
        this.enableFlagUser(this.flagUser);*/
   // console.log('SOY FEES COMP');
   // console.log(this.batches);
    if(this.batches.length == 0)
        this.v_records = '0';

    this.cardFlag = false;
    this.chargeReasons('');        
    this.loadBatchesText();
    this.loadBatchesStatus();
  }

    ngOnInit() {
        if(localStorage.getItem('disableRoot') == 'true')
            this.disableRt.disableRoot = true;
        //this.batches = this._heroesService.getBrowseBatch();
        if(!this.flagRegularized)
            this.batches = [];

        this.radioActAll = false;
        this.checkAllBox = false;
        this.enableSelectReason(true);
        if(this.flagUser)
            this.enableFlagUser(this.flagUser);

        this.loadBatchesText();
        this.loadBatchesReason();
        this.loadBatchesStatus();
    }

    lotIdBrowse(newValue){
        this.lotId = newValue;
        console.log(newValue);
        let firstDate='', lastDate = '';
        firstDate = JSON.stringify( this.startDate );
        lastDate = JSON.stringify( this.endDate );
        this.radioActAll = false;
        this.onSelectionMarkAll();
     
        if(this.isEmpty(firstDate))
          firstDate = '';
        else
          firstDate = '' + this.startDate.day + '/' + this.startDate.month + '/' + this.startDate.year;
    
        if(this.isEmpty(lastDate))
          lastDate = '';
        else
          lastDate = '' + this.endDate.day + '/' + this.endDate.month + '/' + this.endDate.year;
    
        this._heroesService.browseBatch( firstDate,
                                         lastDate,
                                         this.lotId,
                                         this.orderIdentifier,
                                         this.selectedOficina.officeId,
                                         this.selectedPaymentType.description,
                                         this.selectedEstado.status                                     
                                        )
        .toPromise().then(data => {
            if(data){
                this.batches = data;
                this.enableSelectReason(true);
                this.chargeReasons('');
                this.loadBatchesText();
                this.loadBatchesStatus();
                this.enableFlagVariable(false);
                if(this.flagUser)
                    this.enableFlagUser(true);
                
                this.v_records = localStorage.getItem('b_records');
                if(this.batches.length == 0)
                  this.v_records = '0';
            }
          });

    }

    startDateBrowse(newStartDate){
        if(!this.isEmpty(this.startDate.day)){
          this.startDate = newStartDate;
          this.startDateStr = this.jsonDateToString(this.startDate);
          this.startDateStr = this.formatDateReport(new Date(this.startDateStr));
          this.startDateLng = this.strDateToLong(this.startDateStr);
          if(this.isEmpty(this.endDate)){
            this.browseParameters();
          } else{
            this.endDateStr = this.jsonDateToString(this.endDate);
            this.endDateStr = this.formatDateReport(new Date(this.endDateStr));
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
          this.endDateStr = this.formatDateReport(new Date(this.endDateStr));
          this.endDateLng = this.strDateToLong(this.endDateStr);
    
          if(this.isEmpty(this.startDate)){
            this.browseParameters();
          } else {
            this.startDateStr = this.jsonDateToString(this.startDate);
            this.startDateStr = this.formatDateReport(new Date(this.startDateStr));
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

    chargeOffices(selectedCanal){
        let officeEmpty = {officeId: "", officeName: ""};
    
        this._heroesService.chargeOffices( 
              selectedCanal                                     
        )
        .toPromise().then(data => {
          data.push(officeEmpty);
          this.oficinas = data;
          console.log('SOY CHARGEOFF: ');
          console.log(this.oficinas);
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

        this.radioActAll = false;
        this.onSelectionMarkAll();
     
        if(this.isEmpty(firstDate))
          firstDate = '';
        else
          firstDate = '' + this.startDate.day + '/' + this.startDate.month + '/' + this.startDate.year;
    
        if(this.isEmpty(lastDate))
          lastDate = '';
        else
          lastDate = '' + this.endDate.day + '/' + this.endDate.month + '/' + this.endDate.year;
    
        this._heroesService.browseBatch( firstDate,
                                         lastDate,
                                         this.batchIdentifier,
                                         this.orderIdentifier,
                                         this.selectedOficina.officeId,
                                         this.selectedPaymentType.description,
                                         this.selectedEstado.status                                     
                                        )
        .toPromise().then(data => {
            if(data){
                this.batches = data;
                this.enableSelectReason(true);
                this.chargeReasons('');
                this.loadBatchesText();
                this.loadBatchesStatus();
                this.enableFlagVariable(false);
                if(this.flagUser)
                    this.enableFlagUser(true);                    
                
               // this.loadBatchesReason();
                this.v_records = localStorage.getItem('b_records');
                if(this.batches.length == 0)
                  this.v_records = '0';
                console.log('SIGNATURE: ');
                console.log(this.batches[0].claroSignature + ', FIRST TIME: ');
                console.log(this.batches[0].signatureFirstTime);
            }
          });
    }
    
    public isEmpty(str:string) {
        return (!str || 0 === str.length);
    }

    onValueChange(i:number){
        if(this.selectedLote[i].name == 'RECHAZADO'){
            this.selectReasonEn[i] = false;
            this.selectedReason[i] = this.batchReason[0];
        } else if(this.selectedLote[i].name == 'REGULARIZADO'){
            this.selectedReason[i] = {idReason: "", description: ""};
            this.selectReasonEn[i] = true; 
        } else if(this.selectedLote[i].name == 'PENDIENTE'){
            this.selectedReason[i] = {idReason: "", description: ""};
            this.selectReasonEn[i] = true; 
        }
    }


    onSelectionChange(lote, index: number){
    
        if(this.radioActAr[index]){
            let batchNew = new Batch(
            '' + lote.orderId,
            '' + this.selectedLote[index].name,
            '' + this.selectedReason[index].description,
            index,
            '' + this.batchObservation[index],
            '' + lote.lotId
            );
            this.batchRegular.push(batchNew);
        } else{
            let indexReal = this.indexOfBatch(this.batchRegular,lote.orderId);
            if (indexReal !== -1)
                this.batchRegular.splice(indexReal, 1);
            else
                this.batchRegular.splice((this.batchRegular.length-1), 1);
        }
    }


    onSelectionMarkAll(){
        let lenBatches = this.batches.length;
        let r;
        if(this.radioActAll){
            if(lenBatches >= 1){
                for(r=0; r<lenBatches; r++){
                    if(!this.flagUserEnable[r]){
                        this.radioActAr[r] = true;
                        this.onSelectionChange(this.batches[r], r);
                        this.selectedLote[r] = this.loteEstado[1];
                    }
                }
            }  
        } else{
            let lenArray = this.batchRegular.length;
            let lenOrigin = this.batches.length;
            let q;
            if(lenOrigin >= 1){
                let t;
                //this.ngOnInit();
                for(t=0; t<lenOrigin; t++)
                    this.radioActAr[t] = false;
                
                this.batchRegular.splice(0, lenArray);
            }
            console.log('ELSECHANGEALL-TAM: ' + this.batchRegular.length);      
        }
    }  


    preActualizarLotes(){
        this.showAlert("ESTÁ SEGURO QUE DESEA REGULARIZAR ÓRDENES?");
    }

    actualizarLotes(){
        let lotIdent = this.loggedUsername;
        let today = '' + this.formatDate(new Date());
        let indexReg = 0;
        this.flagRegularize = true;
        let lbatch = 0;
        lbatch = this.batchRegular.length;
        localStorage.setItem('l_batch', '' + lbatch);

        if(lbatch >= 1){
            let p;
            let len = this.batchRegular.length;
            this.v_lotId = this.batchRegular[0].lotId;
            for(p=0; p<len; p++){
                indexReg = this.batchRegular[p].indexOld;
                this.batchRegular[p].status = this.selectedLote[indexReg].name;
                this.batchRegular[p].reason = this.selectedReason[indexReg].description;
                this.batchRegular[p].observation = this.batchObservation[indexReg];
            }
        }
        //this.objRegular.lotId = this.v_lotId;
        this.objRegular.regularized_user = lotIdent;
        this.objRegular.regularizedDate = today;
        this.objRegular.updateLotDetail = this.batchRegular;

        this._heroesService.nuevoRegular( this.objRegular )
        .subscribe( data=>{
           if(data.code == 201){
                console.log('COMPON-201: ');
                this.garbageCollectorBash();
                this.flagRegularized = true;
                this.browseBatchAsync();
            }      
        },
        error=> console.error(error));
    }

    loadBatchesStatus(){
        let len = this.batches.length; 
        if(len>=1){
            let p;
            let status; 
            for(p=0; p<len; p++){
                switch(this.batches[p].status){
                    case 'PENDIENTE':
                        this.selectedLote[p] = this.loteEstado[0];
                        break;
                    case 'REGULARIZADO':
                        this.selectedLote[p] = this.loteEstado[1];
                        break;
                    case 'RECHAZADO':
                        this.selectedLote[p] = this.loteEstado[2];
                        this.selectReasonEn[p] = false;
                        break;
                    case 'REGULARIZAR':
                        this.selectedLote[p] = this.loteEstado[1];
                        break;
                    case 'PEN':
                        this.selectedLote[p] = this.loteEstado[0];
                        break;        
                }
            }
        }
    }

    loadBatchesText(){
        let len = this.batches.length;
        if(len>=1){
            let p;
            for(p=0; p<len; p++){
                //this.batchReason[p] = "";
              this.batchObservation[p] = "";
            }
        }
    }


    loadBatchesReason(){
        let len = this.batches.length;
        if(len>=1){
            let p;
            for(p=0; p<len; p++){
               // this.batches[p].activationDate = this.formatDateReport(new Date(this.batches[p].activationDate));
               // this.batches[p].lotDate = this.formatDateReport(new Date(this.batches[p].lotDate));
            if(this.batches[p].reason != ''){
                switch(this.batches[p].reason){
                case 'Firma inconforme':
                    this.selectedReason[p] = this.batchReason[0]; 
                    break;
                case 'Falta firma en documento':
                    this.selectedReason[p] = this.batchReason[1];
                    break;
                case 'Falta documento':
                    this.selectedReason[p] = this.batchReason[2];
                    break;
                case 'Documento ilegible o caducado':
                    this.selectedReason[p] = this.batchReason[3];
                    break;
                case 'Otros':
                    this.selectedReason[p] = this.batchReason[4];
                    break;
                default:
                    this.selectedReason[p] = {idReason: "", description: ""};
                    break;
                }
            } else 
                this.selectedReason[p] = {idReason: "", description: ""};
            }
        }
    }

    enableSelectReason(enableVal:boolean){
        let len = this.batches.length;
        if(len>=1){
            let p;
            for(p=0; p<len; p++){
                this.selectReasonEn[p] = enableVal;
            }
        }
    }

    enableFlagVariable(enableVal:boolean){
        let len = this.batches.length;
        if(len>=1){
            let p;
            for(p=0; p<len; p++){
                this.flagUserEnable[p] = enableVal;                               
            }
        }
    }

    enableFlagUser(enableVal:boolean){
        let len = this.batches.length;
        if(len>=1){
            let p;
            for(p=0; p<len; p++){
                if(this.batches[p].status == 'REGULARIZADO')
                    this.flagUserEnable[p] = enableVal;                               
            }
        }
    }


    formatDate(date) {   
        return this._datePipeService.transform(date, 'yyyy-MM-ddTHH:mm:ss');   
    }

    formatDateReport(date) {   
        return this._datePipeService.transform(date, 'yyyy-MM-dd');   
    }

    showAlert(message){
        if(window.confirm(message)){
            console.log('ACEPTÓ - CLIENTE');
        } else{
            console.log('DECLINÓ - CLIENTE');
        }
    }

    showRegAlert(message){
        if(window.confirm(message)){
            console.log(message);
        } else{
            console.log('REGULARIZACION - NOEXITO');
        }
    }

    logout(){
        this._authService.logout();
    }

    goHome(){
        this.router.navigate(['/home']);
    }

    browseBatchAsync(){
        let lotId = localStorage.getItem('b_lotId');
        let startDate = localStorage.getItem('b_startDate');
        let endDate = localStorage.getItem('b_endDate');
        let orderId = localStorage.getItem('b_orderId');
        let salesChannel = localStorage.getItem('b_salesChannel');
        let paymentType = localStorage.getItem('b_paymentType');
        let statusId = localStorage.getItem('b_statusId');

        this.v_lotId = localStorage.getItem('v_lotId');
        this.v_lotDate = localStorage.getItem('v_lotDate');
        this.v_records = localStorage.getItem('v_records');

        this._heroesService
        .browseBatchAsync(startDate,
                        endDate,
                        lotId,
                        orderId,
                        salesChannel,
                        paymentType,
                        statusId
                    )
        .subscribe( data=>{
            this.batches = data;
            this.router.navigate(['/batches']);
            this.ngOnInit();
            this.openModalOK();
            this.loadBatchesStatus();
            this.enableSelectReason(true);
            this.loadBatchesReason();
            this.enableFlagVariable(false);
            if(this.flagUser)
                this.enableFlagUser(true);
           // console.log('COMPONENT-ASYNC: ');
           // console.log(this.batches);
        });
    }


    chargeReasons(varReason){
        this._heroesService.chargeReasons( 
            varReason                                     
        )
        .subscribe( data=>{
            if(data.code == 200){
                this.batchReason = data.reasonsResults;
                this.loadBatchesReason();
            }      
            console.log('SOY - CHARGE REASONS: ')
            console.log(this.batchReason);
        });
    }


    garbageCollectorBash(){
        let radioLen = this.radioActAr.length;
        let bRegular = this.batchRegular.length;
        this.flagCheck = false;
        let p, q;
        for(p=0; p<radioLen; p++){
            this.radioActAr[p] = false;
        }
        this.batchRegular.splice(0,bRegular-1);
        this.loadBatchesText();
    }

    indexOfBatch(batchList, orderId){
        let bLength = batchList.length;
        let p, counter =0;
        for(p=0; p<bLength; p++){
            if(orderId == batchList[p].orderId)
                return counter;
            counter = counter + 1;
        }
        return 0;
    }
    
   /* public captureScreen(){  
        var data = document.getElementById('tablebatch');  
        html2canvas(data).then(canvas => {  
            // Few necessary setting options  
            var imgWidth = 208;   
            var pageHeight = 295;    
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
        
            const contentDataURL = canvas.toDataURL('image/png')  
            let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
            var position = 0;  
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
            pdf.save('comisiones.pdf'); // Generated PDF   
        });  
    }*/


    openModal(){
        this.display='block';
    }

    onCloseHandled(){
        this.display='none'; 
    }


    openModalOK(){
        let lbatch = '0';
        lbatch = localStorage.getItem('l_batch');
        this.displayOK='block';    
        this.mdBatchesLenght = lbatch;
    }

    onCloseHandledOK(){
        this.displayOK='none';
        this.display='none';
        this.mdBatchesLenght = '0';
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
        this.radioActAll = false;
        this.onSelectionMarkAll();
        let firstDate = '', lastDate = '';
        this.selectedPaymentType = {idPayment: "" , description: ""};
        this.selectedOficina = {officeId: "", officeName: ""};
        this.selectedEstado = {id: "", status: ""};
        this.startDate = '', this.endDate = '';
        this.lotId = '';

        this._heroesService.browseBatch( firstDate,
                                        lastDate,
                                        '',
                                        '',
                                        '',
                                        '',
                                        ''                                     
        )
        .toPromise().then(data => {
            if(data){
                this.batches = data;
                this.enableSelectReason(true);
                this.chargeReasons('');
                this.loadBatchesText();
                this.loadBatchesStatus();
                console.log('FLAG-USER-TODOS: ');
                console.log(this.flagUser);
                this.enableFlagVariable(false);
                if(this.flagUser)
                    this.enableFlagUser(true);

                this.v_records = localStorage.getItem('b_records');
                if(this.batches.length == 0)
                    this.v_records = '0';
            }
        }); 
      }

    public exportToExcel(){
        let batches:any[] = [];
        batches = this.setHeaderBatchesExcel();
        this._excelService.exportAsExcelFile(batches, 'regularizacion');
    }

    public downloadPDF(){
        let lenBatches = this.batches.length;
        let p;
        console.log('BATCHES-PDF: ');
        console.log(lenBatches + ', batCHES: ');
        console.log(this.batches);
    
        this.columns = [
          'Signat ?', '1ra. Vez', 
          'Nro. Orden', 'Identidad', 
          'Fec. Creación', 'Usu. Ingreso', 
          'F. Pago', 'Banco',
          'Codigo Of.', 'Oficina', 
          'Dias', 'Número Lote', 
          'Estado', 'Observación', 
          'Motivo'
        ];
        this.rows = [];
    
        for(p=0; p<lenBatches; p++){
            let records = [
              this.batches[p].claroSignature === ''? '': (this.batches[p].claroSignature === 'S'? 'SI': 'NO'),
              this.batches[p].signatureFirstTime === ''? '': (this.batches[p].signatureFirstTime === 'S'? 'SI': 'NO'),    
              this.batches[p].orderId,
              this.batches[p].customerId,
              this.v_lotDate,
              this.batches[p].loggedUser,
              this.batches[p].paymentType,
              this.batches[p].financialInstitution,
              this.batches[p].officceId,
              this.batches[p].officce,
              this.batches[p].days,
              this.batches[p].lotId,
              this.selectedLote[p].name,
              this.batches[p].observation,
              this.selectedReason[p].description
            ];
            this.rows[p] = records;
        }
        let doc = new jsPDF('l', 'pt', 'a3');
        doc.autoTable(this.columns, this.rows,
          {
            headerStyles: {
              fillColor: [255, 0, 0],
              fontSize: 8
            },
            bodyStyles: {fontSize: 8},
            margin: {top: 60, left:15, right:15},
            addPageContent: function(data) {
              doc.text("Reporte Lotes Ordenes Venta", 40, 30);
            }
        }); // typescript compile time error
        doc.save('LotesJSPDF.pdf');
      }
      
      private setHeaderBatchesExcel(){
        let batches:any[] = [];
        let lenBatches = this.batches.length;
        let p;
    
        for(p=0; p<lenBatches; p++){
          let objBatchesNew = {
            'Signature ??':this.batches[p].claroSignature === ''? '': (this.batches[p].claroSignature === 'S'? 'SI': 'NO'),
            '1era. Vez ??':this.batches[p].signatureFirstTime === ''? '': (this.batches[p].signatureFirstTime === 'S'? 'SI': 'NO'),
            'Número Orden':this.batches[p].orderId,
            'Identificación Cliente':this.batches[p].customerId,
            'Fecha Creación':this.batches[p].lotDate,
            'Usuario Ingreso':this.batches[p].loggedUser,
            'Forma Pago':this.batches[p].paymentType,
            'Banco':this.batches[p].financialInstitution,
            'Código Oficina':this.batches[p].officceId,
            'Nombre Oficina':this.batches[p].officce,
            'Número Dias':this.batches[p].days,
            'Número Lote':this.batches[p].lotId,
            'Estado':this.batches[p].status,
            'Observación':this.batches[p].observation,
            'Motivo':this.batches[p].reason
          };
          batches.push(objBatchesNew);
        }
        return batches;
      }     

}