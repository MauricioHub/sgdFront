import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {ResponseModule} from "../../../interface/response-module";
import {Trazabilidad} from"../../../interface/trazabilidad";
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
  displayedColumns: string[] = ['select', 'orderid', 'loteid','datere','status','user','senduser','senddate'];
  public file= new MatTableDataSource();
  selection = new SelectionModel(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(public router: Router,private getserve: ServicesgetService,private disableRt:Globals) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
    this.listfiletrace();
  }
  applyFilter(filterValue: string) {
     this.file.filter = filterValue.trim().toLowerCase();}
     isAllSelected() {
       const numSelected = this.selection.selected.length;
       const numRows = this.file.data.length;
       return numSelected === numRows;
     }

     masterToggle() {
       this.isAllSelected() ?
           this.selection.clear() :
           this.file.data.forEach(row => this.selection.select(row));
     }

ngOnInit() {

}

listfiletrace(){
  this.getserve.getfiletrace('','','','','').subscribe((file:any)=>{
  console.log(file);
    this.file.data=file;
    this.file.paginator = this.paginator;
    this.file.sort = this.sort;
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
