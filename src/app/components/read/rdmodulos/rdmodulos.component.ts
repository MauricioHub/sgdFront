import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {Modulo} from "../../../interface/modulo";
import {ResponseModule} from "../../../interface/response-module";
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import {UpmodulosComponent} from '../../update/upmodulos/upmodulos.component';
import { CrmoduloComponent } from '../../create/crmodulo/crmodulo.component';
import { Globals } from '../../../app.globals';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rdmodulos',
  templateUrl: './rdmodulos.component.html',
  styleUrls: ['./rdmodulos.component.css']
})
export class RdmodulosComponent implements OnInit {
displayedColumns: string[] = ['NOMBRE', 'ESTADO','editar'];
value = 'Clear me';

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

public modules= new MatTableDataSource();
public valid:boolean=false;
  constructor(public router: Router,private srdmodulo:ServicesgetService,public dialog: MatDialog,private disableRt:Globals ){
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
  this.listaids()
  this.applyFilter('')
}

applyFilter(filterValue: string) {
   this.modules.filter = filterValue.trim().toLowerCase();
}

ngOnInit() {

}

listaids(){

  this.srdmodulo.getModule('','').subscribe((modules:any)=>{
  console.log(modules);
  this.modules.data=modules.modulos;
  this.modules.paginator = this.paginator;
  this.modules.sort = this.sort;
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
openDialogUpdate(element:Modulo){
  const dialogRef = this.dialog.open(UpmodulosComponent, {
     width: '500px',
     height: '500px',
       disableClose:false,
     data: element
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
     this.listaids()
   });
 }

 openDialogcreate(element:Modulo){
   const dialogRef = this.dialog.open(CrmoduloComponent, {
      width: '500px',
      height: '400px',
      disableClose:false
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
