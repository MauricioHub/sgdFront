import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {ResponseModule} from "../../../interface/response-module";
import {Trazabilidad} from"../../../interface/Trazabilidad";
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import { Globals } from '../../../app.globals';
import {SelectionModel} from '@angular/cdk/collections';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export interface estadoopc {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rdtrazabilidad',
  templateUrl: './rdtrazabilidad.component.html',
  styleUrls: ['./rdtrazabilidad.component.css']
})
export class RdtrazabilidadComponent implements OnInit {
  displayedColumns: string[] = ['select','name','weight','estado','tipo','opcestado','modu','modestado', 'editar']
  @ViewChild(MatPaginator) paginator:MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
  public traza= new MatTableDataSource();
  selection= new SelectionModel(true,[]);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.traza.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
   this.isAllSelected() ?
       this.selection.clear() :
       this.traza.data.forEach(row => this.selection.select(row));
 }


  constructor(public router: Router,private rdtraza:ServicesgetService,public dialog:MatDialog,private disableRt:Globals) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
        this.listfile()
      this.applyFilter('')
    }

      applyFilter(filterValue: string) {
         this.traza.filter = filterValue.trim().toLowerCase();}
  ngOnInit() {
  }
  estad:estadoopc[]=[
    {value: 'ENVIADO', viewValue: 'ENVIADO'},
    {value: 'DEVUELTO', viewValue: 'DEVUELTO'},
    {value: 'REGULARIZADO', viewValue: 'REGULARIZADO'},
  ];

listfile(){
  this.rdtraza.getfiletrace('','','','','').subscribe((traza:any)=>{
    console.log(traza);
    this.traza.data=traza;
    this.traza.paginator=this.paginator;
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
    this.router.navigate(['/rdusuarios']);
  } else{
    this.router.navigate(['/rdusuarios']);
  }
}
}
