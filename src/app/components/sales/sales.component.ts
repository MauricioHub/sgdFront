import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HeroesService } from "../../services/heroes.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Sale } from '../../interfaces/sale.interface';
import { ExcelService } from "../../services/excel.service";
import { Globals } from '../../app.globals';

declare var jsPDF: any;

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  heroes:any[] = [];
  loading:boolean = true;
  checkDis:boolean;
  radioAct:boolean = false;
  radioActAll:boolean = false;
  temp:boolean = false;
  cardFlag: boolean = false;
  flagBatched:boolean = false;
  enableSaleCreation:boolean = false;

  loggedUsername:string = "";
  v_records:string = "";
  checkSales:boolean[] = [];
  enableSales:boolean[] = [];
  batchSequence:number = 0;
  lotSequence = '';

  checkActive:{
    indexActive:0;
    radioActive:false;
  }
  radioAct2:boolean[] = [];
  rows:any[] = [];
  columns:any[] = [];
  cols:any[] = [];

  objLote:any = {
    lotId: "", 
    lotDate: "",
    lotDetail: []
  };

  loteList: Sale[] = [];

  display='none';
  displayOK='none';
  mdSalesLenght = '';
  startDate:any = {day:'', month:'', year:''}; 
  endDate:any = {day:'', month:'', year:''};
  startDateStr:string = '';
  endDateStr:string = '';
  lotId:string = '';
  startDateLng:number = 0;
  endDateLng:number = 0;

  estados:any[] = [
    {id: "", status: ""},
    {id: "1", status: "PENDIENTE"},
    {id: "2", status: "REGULARIZADO"},
    {id: "3", status: "RECHAZADO"}
  ];

  channels:any[] = [{channelId: "", description: ""}];
  selectedChannel:any = {channelId: "" , description: "todos"};
  oficinas:any[] = [{officeId: "", officeName: ""}];
  selectedOficina:any = {officeId: "", officeName: ""};
  selectedEstado:any = {id: "", status: ""};
  
    constructor(private _heroesService:HeroesService,
                private router:Router,
                private route:ActivatedRoute,
                private authService:AuthService,
                private _datePipeService:DatePipe,
                private _excelService:ExcelService,
                private disableRt:Globals) {
      this.disableRt.profileRoot[0] = JSON.parse(localStorage.getItem('sales_module'));
      this.disableRt.profileRoot[1] = JSON.parse(localStorage.getItem('fees_module'));
      this.disableRt.profileRoot[2] = JSON.parse(localStorage.getItem('batches_module'));            
      if(localStorage.getItem('disableRoot') == 'true')
        this.disableRt.disableRoot = true;
      if(this.disableRt.profileRoot[0].creacionPr)
        this.enableSaleCreation = this.disableRt.profileRoot[0].creacionPr;

      this.chargeChannels();
      this.chargeOffices(this.selectedChannel.channelId);
      if(!this.flagBatched)
        this.heroes = [];

      this._heroesService.getBatchSequenceAsync()
      .subscribe((data:any) => {
        if(data.code == 200){
          this.batchSequence = data.sequence;
        }          
      });

      this.loggedUsername = localStorage.getItem('logged_username');
      this.v_records = localStorage.getItem('vE_records');
      if(this.heroes.length == 0)
        this.v_records = '0';
      this.checkDis = true;
      this.enableCheckButtons(true);

      this.cardFlag = false;
      this.cols = [
          { field: 'customerId', header: 'Ced. Cliente' },
          { field: 'officceId', header: 'Código Oficina' },
          { field: 'paymentType', header: 'Tipo Pago' },
          { field: 'financialInstitution', header: 'Institución Financiera' },
          { field: 'loggedDate', header: 'Fecha Reporte' },
          { field: 'reason', header: 'Motivo' },
          { field: 'lotId', header: 'Código Lote' }
      ];
       
  }

  ngOnInit() {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
    if(!this.flagBatched)
        this.heroes = [];
    this.loading = false;
    this.radioActAll = false;
    if(this.heroes.length == 0)
      this.v_records = '0';
    else
      this.v_records = localStorage.getItem('vE_records');
    this.enableCheckButtons(true);
  }

  lotIdBrowse(newValue){
    this.lotId = newValue;
    this.radioActAll = false;
    this.onSelectionMarkAll();
    let firstDate = '';
    let lastDate = '';
    if(this.startDate.day == '')
      firstDate = '';
    else
      firstDate = '' + this.startDate.day + '/' + this.startDate.month + '/' + this.startDate.year;
      
    if(this.endDate.day == '')
      lastDate = '';
    else
      lastDate = '' + this.endDate.day + '/' + this.endDate.month + '/' + this.endDate.year;

    this._heroesService.browseVenta( firstDate,
                                     lastDate,
                                     this.selectedChannel.channelId,
                                     this.selectedOficina.officeId,
                                     this.lotId,
                                     this.selectedEstado.status                                     
                                    )
    .toPromise().then(data => {
      if(data){
        this.heroes = data;
        this.v_records = localStorage.getItem('s_records');
        if(this.heroes.length == 0)
          this.v_records = '0';
      }
    });
  }

  startDateBrowse(newStartDate){
    this.startDate = newStartDate;
    this.startDateStr = this.jsonDateToString(this.startDate);
    this.startDateStr = this.formatDateReport(new Date(this.startDateStr));
    this.startDateLng = this.strDateToLong(this.startDateStr);

    if(this.isEmpty(this.endDate.day)){
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

  endDateBrowse(newEndDate){
    this.endDate = newEndDate; 
    this.endDateStr = this.jsonDateToString(this.endDate);
    this.endDateStr = this.formatDateReport(new Date(this.endDateStr));
    this.endDateLng = this.strDateToLong(this.endDateStr);

    if(this.isEmpty(this.startDate.day)){
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

  jsonDateToString(time){
    let newDate = '' + time.month + '/' + time.day + '/' + time.year;
    return newDate;
  }
  
  strDateToLong(timeStr){
    let newDate = new Date(timeStr).valueOf();
    return newDate;
  }

  logout(){
      this.authService.logout();
  }


  onSelectionChange(venta, index: number){
      let loggedDate = '' + this.formatDate(venta.loggedDate);
      let activationDate = '' + this.formatDate(venta.activationDate);

      if(this.radioAct2[index]){

        let ventaNueva = new Sale(
          '' + venta.order,
          '' + venta.officceId,
          '' + venta.officce,
          '' + venta.customerId,
          '' + venta.customer,
          '' + venta.product,
          '' + activationDate,
          '' + this.loggedUsername,
          '' + venta.status,
          '' + venta.paymentType,
          '' + venta.financialInstitution
        );
        this.loteList.push(ventaNueva);

      } else{
        let indexReal = this.indexOfSale(this.loteList,venta.order);
        if (indexReal !== -1)
          this.loteList.splice(indexReal, 1);
        else
          this.loteList.splice((this.loteList.length-1), 1);
      }
  }

  enableCheckButtons(varBool){
    //this.checkDis= false;
    let lenHeroes = this.heroes.length;
    let q,r;

    if(varBool){
      for(q=0; q<lenHeroes; q++){
        this.heroes[q].activationDate = this.formatDateReport(this.heroes[q].activationDate);
        this.heroes[q].loggedDate = this.formatDateReport(this.heroes[q].loggedDate);
        this.enableSales[q] = varBool;
        console.log(this.enableSales[q]);
      }
    } else{
      for(r=0; r<lenHeroes; r++){
        this.enableSales[r] = varBool;
        console.log(this.enableSales[q]);
      }
    }
  }


  markCheckButtons(varBool){
    let lenHeroes = this.heroes.length;
    let q,r;

    if(varBool){
      for(q=0; q<lenHeroes; q++){
        this.checkSales[q] = varBool;
      }
    } else{
      for(r=0; r<lenHeroes; r++){
        this.checkSales[r] = varBool;
      }
    }
  }


  preGenerarLote(){
    this.showAlert("ESTÁ SEGURO QUE DESEA GENERAR UN LOTE?");
  }

  generarLote(){
    let lotIdent = '';
    let today = '' + this.formatDate(new Date());
    let lsale = 0;
    lsale = this.loteList.length;
    localStorage.setItem('l_sale', '' + lsale);
    
    if(lsale >= 1){
      let identificador = this.batchSequence;
      let codigoOficina = this.loteList[0].officceId;
      let nombreOficina = this.loteList[0].officce;
  
      let re = / /g;
      let resultOficina = nombreOficina.replace(re, "_");
      lotIdent = '' + identificador + '_' + codigoOficina + '_' + resultOficina;
    }

    this.objLote.lotId = lotIdent;
    this.objLote.lotDate = today;
    this.objLote.lotDetail = this.loteList;
    console.log('SOY-GENERAR-LOTE: ');
    console.log(this.objLote);
    console.log(this.objLote.lotDetail);

   this._heroesService.nuevoLote( this.objLote )
    .subscribe( data=>{
         console.log(data);
         if(data.code == 201){
          localStorage.setItem('vE_lotSequence', lotIdent);
          this.garbageCollectorSale();
          this.flagBatched = true;
          this.browseVentaAsync();
         }
    },
    error=> console.error(error));
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


  showLotAlert(message){

    if(window.confirm(message)){
      console.log('SALIÓ - EXITO');
    } else{
      console.log('SALIÓ - noEXITO');
    }
  }

  
  onSelectionMarkAll(){
    console.log(this.radioActAll);
    let lenHeroes = this.heroes.length;
    let r;

    if(this.radioActAll){
      let len = this.radioAct2.length;
      let p;
      this.temp = true;

      if(lenHeroes >= 1){

        for(r=0; r<lenHeroes; r++){
          let loggedDate = '' + this.formatDate(this.heroes[r].loggedDate);
          let activationDate = '' + this.formatDate(this.heroes[r].activationDate);
          if(this.heroes[r].status != 'REGULARIZADO'){
            if(this.heroes[r].status == 'PENDIENTE'){
              if(this.isEmpty(this.heroes[r].lotId)){
                this.checkSales[r] = true;
                this.radioAct2[r] = true;
                this.onSelectionChange(this.heroes[r], r);
              }
            } else {
                this.checkSales[r] = true;
                this.radioAct2[r] = true;
                this.onSelectionChange(this.heroes[r], r);
            }          
          }
        }
      }
      console.log('IFCHANGEALL-TAM: ' + this.loteList.length);  
    } else{
      let lenOrigin = this.heroes.length;
      let lenArray = this.loteList.length;      
      let q;
      this.temp = false;

      if(lenArray >= 1){
        let t;
        for(t=0; t<lenOrigin; t++){
          this.checkSales[t] = false;
          this.radioAct2[t] = false;
        }
        this.loteList.splice(0, lenArray);
      }      
    }
  }

  onSelectionEnableAll(){
    this.checkDis = false;
    let lenHeroes = this.heroes.length;
    let r;
    for(r=0; r<lenHeroes; r++){
      if(this.heroes[r].status != 'REGULARIZADO'){
        if(this.heroes[r].status == 'PENDIENTE'){
          if(this.isEmpty(this.heroes[r].lotId))
            this.enableSales[r] = false;
        } else
          this.enableSales[r] = false;          
      }
    }
  }


  browseVentaAsync(){
    let firstD = localStorage.getItem('s_firstD');
    let lastD = localStorage.getItem('s_lastD');
    let idCanal = localStorage.getItem('s_idCanal');
    let idOficina = localStorage.getItem('s_idOficina');
    let idLote = localStorage.getItem('s_idLote');
    let idStatus = localStorage.getItem('s_idStatus');
    this.lotSequence = localStorage.getItem('vE_lotSequence');

    this.v_records = localStorage.getItem('vE_records');
    this._heroesService
        .browseVentaAsync(firstD,
                          lastD,
                          idCanal,
                          idOficina,
                          idLote,
                          idStatus)
        .subscribe( data=>{
          this.heroes = data;
          this.router.navigate(['/sales']);
          this.ngOnInit();
          this.openModalOK();
          console.log('COMPONENT-ASYN: ');
          console.log(this.heroes);
        });      
  }


  garbageCollectorSale(){
    let radioLen = this.radioAct2.length;
    let sLote = this.loteList.length;
    this.temp = false;

    let p;
    for(p=0; p<radioLen; p++){
      this.radioAct2[p] = false;
    }
    this.loteList.splice(0,sLote-1);
    //this.loadBatchesText();
  }


  indexOfSale(loteList, orderId){
    let bLength = loteList.length;
    let p, counter =0;
    for(p=0; p<bLength; p++){
      if(orderId == loteList[p].orderId)
        return counter;
      counter = counter + 1;
    }
    return 0;
  }

  public isEmpty(str:string) {
    return (!str || 0 === str.length);
  }

  onSelectionChannelChange(selectedCanal){
    this.chargeOffices(selectedCanal.channelId);
    this.browseParameters();
  }

  chargeChannels(){
    this._heroesService.chargeChannels()
    .toPromise().then(data => {
      var dataList = this.dataListSort(data,1);
      this.channels = dataList;
    });
  }

  chargeOffices(selectedCanal){
    this._heroesService.chargeOffices( 
          selectedCanal                                     
    )
    .toPromise().then(data => {
      var dataList = this.dataListSort(data,2);
      this.oficinas = dataList;
    });
  }


  browseParameters(){
    let firstDate = '';
    let lastDate = ''; 
    this.radioActAll = false;
    this.onSelectionMarkAll();

    if(this.startDate.day === '')
      firstDate = '';
    else
      firstDate = '' + this.startDate.day + '/' + this.startDate.month + '/' + this.startDate.year;

    if(this.endDate.day === '')
      lastDate = '';
    else
      lastDate = '' + this.endDate.day + '/' + this.endDate.month + '/' + this.endDate.year;

    this._heroesService.browseVenta( firstDate,
                                     lastDate,
                                     this.selectedChannel.channelId,
                                     this.selectedOficina.officeId,
                                     this.lotId,
                                     this.selectedEstado.status                                     
                                    )
    .toPromise().then(data => {
      if(data){
        this._heroesService.getBatchSequenceAsync()
        .subscribe((data:any) => {
          if(data.code == 200){
            this.batchSequence = data.sequence;
          }          
        });
        this.heroes = data;
        this.v_records = localStorage.getItem('s_records');
        if(this.heroes.length == 0)
          this.v_records = '0';
        this.checkDis = true;
        this.enableCheckButtons(true);
      }
    });
  }

  
  openModal(){
    this.display='block';
  }

  onCloseHandled(){
    this.display='none'; 
  }

  openModalOK(){
    let lsale = '0';
    this.displayOK='block';
    lsale = localStorage.getItem('l_sale');
    this.mdSalesLenght = lsale;    
  }

  onCloseHandledOK(){
    this.displayOK='none';
    this.display='none';
    this.mdSalesLenght = '0';
  }

  public exportToExcel(){
    let sales:any[] = [];
    sales = this.setHeaderSalesExcel();
    this._excelService.exportAsExcelFile(sales, 'ventas');        
  }

  public downloadPDF(){
    let lenHeroes = this.heroes.length;
    let p;

    this.columns = [
      'Signat ?', '1ra. Vez',
      ' No. Orden', 'Producto', 
      'Cliente', '#Identificación', 
      'F. Activación', 'Forma Pago',
      'Financiera', 
      'Codigo O.', 'Oficina', 
      'Estado', 'Motivo', 
      'Número Lote'
    ];
    this.rows = [];

    for(p=0; p<lenHeroes; p++){
        let records = [
          this.heroes[p].claroSignature === ''? '': (this.heroes[p].claroSignature === 'S'? 'SI': 'NO'),
          this.heroes[p].signatureFirstTime === ''? '': (this.heroes[p].signatureFirstTime === 'S'? 'SI': 'NO'),
          this.heroes[p].order,
          this.heroes[p].description,
          this.heroes[p].customer,
          this.heroes[p].customerId,
          this.formatDateReport(this.heroes[p].activationDate),
          this.heroes[p].paymentType,
          this.heroes[p].financialInstitution,
          this.heroes[p].officceId,
          this.heroes[p].officce,
          this.heroes[p].status,
          this.heroes[p].reason,
          this.heroes[p].lotId
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
        margin: {top: 60, left:5, right:5},
        addPageContent: function(data) {
          doc.text("Reporte Ordenes de Venta", 40, 30);
        }
    }); // typescript compile time error
    doc.save('OrdenesJSPDF.pdf');
  }

  private setHeaderSalesExcel(){
    let sales:any[] = [];
    let lenSales = this.heroes.length;
    let p;

    for(p=0; p<lenSales; p++){
      let objSalesNew = {
        'Signature ??':this.heroes[p].claroSignature === ''? '': (this.heroes[p].claroSignature === 'S'? 'SI': 'NO'),
        '1era. Vez ??':this.heroes[p].signatureFirstTime === ''? '': (this.heroes[p].signatureFirstTime === 'S'? 'SI': 'NO'),
        'Número Orden':this.heroes[p].order,
        'Descripción':this.heroes[p].description,
        'Nombre Cliente':this.heroes[p].customer,
        'Identificación Cliente':this.heroes[p].customerId,
        'Fecha Activación':this.formatDateReport(this.heroes[p].activationDate),
        'Tipo Pago':this.heroes[p].paymentType,
        'Institución Financiera':this.heroes[p].financialInstitution,
        'Fecha Reporte':this.formatDateReport(this.heroes[p].loggedDate),
        'Número Oficina':this.heroes[p].officceId,
        'Nombre Oficina':this.heroes[p].officce,
        'Estado':this.heroes[p].status,
        'Motivo':this.heroes[p].reason,
        'Número Lote':this.heroes[p].lotId
      };
      sales.push(objSalesNew);
    }
    return sales;
  }

  goHome(){
    this.router.navigate(['/home']);
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
    let firstDateAll = '';
    let lastDateAll = '';
    this.radioActAll = false;
    this.onSelectionMarkAll();
    this.chargeOffices('');
    this.selectedChannel = {channelId: "" , description: "todos"};
    this.selectedOficina = {officeId: "", officeName: ""};
    this.selectedEstado = {id: "", status: ""};
    this.startDate = {day:'', month:'', year:''};
    this.endDate = {day:'', month:'', year:''};
    this.lotId = '';

    this._heroesService.browseVenta( firstDateAll,
                                     lastDateAll,
                                     '',
                                     '',
                                     '',
                                     ''                                     
                                  )
      .toPromise().then(data => {
        if(data){
          this._heroesService.getBatchSequenceAsync()
          .subscribe((data:any) => {
            if(data.code == 200){
              this.batchSequence = data.sequence;
            }          
          });
          this.heroes = data;
          this.v_records = localStorage.getItem('s_records');
          if(this.heroes.length == 0)
            this.v_records = '0';
          this.checkDis = true;
          this.enableCheckButtons(true);
        }
      });
  }

  public dataListSort(dataListSource:any[], code:number){
    var dataListSorted:any[] = [];
    var lenDataSource = dataListSource.length;
    var p;

    for(p=0; p<=lenDataSource; p++){
      if(code == 1){
        if(p == 0)
          dataListSorted[0] = {channelId: "", description: ""};
        else
          dataListSorted[p] = dataListSource[p-1];
      }
      if(code == 2){
        if(p == 0)
          dataListSorted[0] = {officeId: "", officeName: ""};
        else
          dataListSorted[p] = dataListSource[p-1];
      }
    }
    return dataListSorted;
  }


}
