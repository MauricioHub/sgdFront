import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {ResponseModule} from "../../../interface/response-module";
import {File} from"../../../interface/file";
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import { Globals } from '../../../app.globals';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rdarchivos',
  templateUrl: './rdarchivos.component.html',
  styleUrls: ['./rdarchivos.component.css']
})
export class RdarchivosComponent implements OnInit {

  displayedColumns: string[] = ['select', 'orderid', 'status','storeUser','storeDate'];
  public files= new MatTableDataSource();
  selection = new SelectionModel(true, []);

      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;


  constructor(public router: Router,private getserve: ServicesgetService,private disableRt:Globals) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
      this.listfiletrace();
  }
  applyFilter(filterValue: string) {
     this.files.filter = filterValue.trim().toLowerCase();}
     isAllSelected() {
       const numSelected = this.selection.selected.length;
       const numRows = this.files.data.length;
       return numSelected === numRows;
     }

     masterToggle() {
       this.isAllSelected() ?
           this.selection.clear() :
           this.files.data.forEach(row => this.selection.select(row));
     }
  ngOnInit() {
  }
  listfiletrace(){
    this.getserve.getfilestore('','','','','').subscribe((files:any)=>{
    console.log(files);
      this.files.data=files;
      this.files.paginator = this.paginator;
      this.files.sort = this.sort;
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
