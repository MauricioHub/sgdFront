import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {ResponseModule} from "../../../interface/response-module";
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import { Globals } from '../../../app.globals';
@Component({
  selector: 'app-rolmodule',
  templateUrl: './rolmodule.component.html',
  styleUrls: ['./rolmodule.component.css']
})
export class RolmoduleComponent implements OnInit {
displayedColumns: string[] = ['IDUSUARIO', 'USUARIO','IDROL','ROL'];
public usersrol= new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rduserrol:ServicesgetService,public dialog: MatDialog,private disableRt:Globals ) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
  this.listaids()
  this.applyFilter('') }
  applyFilter(filterValue: string) {
     this.usersrol.filter = filterValue.trim().toLowerCase();
}
  ngOnInit() {
  }
  listaids(){

    this.rduserrol.getuserrol('','','','').subscribe((usersrol:any)=>{
    console.log(usersrol);
    this.usersrol.data=usersrol.usersrol;
    this.usersrol.paginator = this.paginator;
    this.usersrol.sort = this.sort;
  },
  err=>console.log(err))
  }
}
