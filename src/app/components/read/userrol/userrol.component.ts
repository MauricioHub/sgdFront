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
import {Usuario} from "../../../interface/usuario";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CruserproComponent } from '../../create/cruserpro/cruserpro.component';

@Component({
  selector: 'app-userrol',
  templateUrl: './userrol.component.html',
  styleUrls: ['./userrol.component.css']
})
export class UserrolComponent implements OnInit {
  displayedColumns: string[] = ['IDUSUARIO', 'USUARIO','IDROL','ROL','DELETE'];
  public usersrol= new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public router: Router,private rduserrol:ServicesgetService,public dialog: MatDialog,private disableRt:Globals ) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
  this.listaids();
  this.applyFilter('') }

  applyFilter(filterValue: string) {
     this.usersrol.filter = filterValue.trim().toLowerCase();
}
  ngOnInit() {
  }
  listaids(){

    this.rduserrol.getuserrol('','','','').subscribe((usersrol:any)=>{
    console.log(usersrol);
    this.usersrol.data=usersrol
    this.usersrol.paginator = this.paginator;
    this.usersrol.sort = this.sort;
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
  openDialogcreate(element:Usuario){
    const dialogRef = this.dialog.open(CruserproComponent, {
       width: '500px',
       disableClose:false,
     });

     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       this.listaids()
     });
   }

  showAlert(message){
    if(window.confirm(message)){
      this.router.navigate(['/home']);
    } else{
      this.router.navigate(['/home']);
    }
  }
}
