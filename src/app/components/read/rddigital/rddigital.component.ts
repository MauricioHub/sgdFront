import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {ResponseModule} from "../../../interface/response-module";
import {Digital} from"../../../interface/digital";
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import { Globals } from '../../../app.globals';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-rddigital',
  templateUrl: './rddigital.component.html',
  styleUrls: ['./rddigital.component.css']
})
export class RddigitalComponent implements OnInit {

displayedColumns: string[] = ['select', 'orderid', 'loteid','datere','status'];
public digital= new MatTableDataSource();
selection = new SelectionModel(true, []);
value = 'Clear me';

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


constructor(public router: Router,private getserve: ServicesgetService,private disableRt:Globals) {
  if(localStorage.getItem('disableRoot') == 'true')
    this.disableRt.disableRoot = true;
}
applyFilter(filterValue: string) {
   this.digital.filter = filterValue.trim().toLowerCase();}
   isAllSelected() {
     const numSelected = this.selection.selected.length;
     const numRows = this.digital.data.length;
     return numSelected === numRows;
   }

   masterToggle() {
     this.isAllSelected() ?
         this.selection.clear() :
         this.digital.data.forEach(row => this.selection.select(row));
   }
ngOnInit() {
}
Readigital(formandig:NgForm){
  this.getserve.gettracedigital(formandig.value.datestart,formandig.value.dateend,formandig.value.estado,formandig.value.users,formandig.value.orden).subscribe((digital:any)=>{
  console.log(digital);
  this.digital.data=digital;
  this.digital.paginator = this.paginator;
  this.digital.sort = this.sort;
  },
  (err:HttpErrorResponse) => {
    if(err.status == 0){
    this.showAlert('ERROR DE CONEXION!');
    }
    if(err.status == 500){
    this.showAlert('ERROR DEL SERVIDOR!');
    }
    if(err.status == 400){
    this.showAlert('ERROR DE ACTUALIZAR LA PAGINA INTENTE DE NUEVO POR FAVOR!');
    }
    if(err.status == 401){
    this.showAlert('ERROR DE CONTENIDO!');
    }

    }
    );
  }

  checkorden(){
    this.getserve.gettracedigital('','','','','').subscribe((digital:any)=>{
    console.log(digital);
    this.digital.data=digital;
    },
    (err:HttpErrorResponse) => {
      if(err.status == 0){
      this.showAlert('ERROR DE CONEXION!');
      }
      if(err.status == 500){
      this.showAlert('ERROR DEL SERVIDOR!');
      }
      if(err.status == 400){
      this.showAlert('ERROR DE ACTUALIZAR LA PAGINA INTENTE DE NUEVO POR FAVOR!');
      }
      if(err.status == 401){
      this.showAlert('ERROR DE CONTENIDO!');
      }

      }
      );
    }



  showAlert(message){
    if(window.confirm(message)){
      this.router.navigate(['/home']);
    } else{
      this.router.navigate(['/home']);
    }
  }
}
