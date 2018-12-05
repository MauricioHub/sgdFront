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



@Component({
  selector: 'app-rdtrazabilidad',
  templateUrl: './rdtrazabilidad.component.html',
  styleUrls: ['./rdtrazabilidad.component.css']
})
export class RdtrazabilidadComponent implements OnInit {
  displayedColumns: string[] = ['name','weight','estado','tipo','opcestado','modu','modestado', 'editar']
  @ViewChild(MatPaginator) paginator:MatPaginator;
  public traza= new MatTableDataSource();


  constructor(private rdtraza:ServicesgetService,public dialog:MatDialog,private disableRt:Globals) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
        this.listfile()
      this.applyFilter('') }
      applyFilter(filterValue: string) {
         this.traza.filter = filterValue.trim().toLowerCase();}
  ngOnInit() {
  }
listfile(){
  this.rdtraza.getfiletrace('','','','','').subscribe((traza:any)=>{
    console.log(traza);
    this.traza.data=traza;
    this.traza.paginator=this.paginator;

  })
}
}
