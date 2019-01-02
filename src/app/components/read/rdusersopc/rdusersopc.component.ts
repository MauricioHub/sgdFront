import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {Opcionusuario} from "../../../interface/opcionusuario";
import {UpusuariosopcionesComponent} from '../../update/upusuariosopciones/upusuariosopciones.component';
import {ResponseModule} from "../../../interface/response-module";
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import { CrusersopcComponent } from '../../create/crusersopc/crusersopc.component';
import { Globals } from '../../../app.globals';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rdusersopc',
  templateUrl: './rdusersopc.component.html',
  styleUrls: ['./rdusersopc.component.css']
})
export class RdusersopcComponent implements OnInit {
  displayedColumns: string[] = ['name','weight','estado','tipo','opcestado','modu', 'editar']
  @ViewChild(MatPaginator) paginator:MatPaginator;
  public usersopclist= new MatTableDataSource();
public valid:boolean=false;
  constructor(public router: Router,private rsuseropc:ServicesgetService,public dialog: MatDialog,private disableRt:Globals ) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
this.listatbOU()
this.applyFilter('')
  }
  applyFilter(filterValue: string) {
     this.usersopclist.filter = filterValue.trim().toLowerCase();
}
  ngOnInit() {
  }
consultausersopc(formauseropc:NgForm){
  console.log(formauseropc.value.idusuario)
  this.rsuseropc.getUserOpc(formauseropc.value.idusuario).subscribe(useropci=>console.log(useropci),
err=>console.log(err))
}

listatbOU(){
  this.rsuseropc.getUserOpc('').subscribe((usersopclist:any)=>{
  console.log(usersopclist);
  this.usersopclist.data=usersopclist.userOptionResult;
  this.usersopclist.paginator = this.paginator;
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
openDialogUpdate(element:Opcionusuario){
  const dialogRef = this.dialog.open(UpusuariosopcionesComponent, {
     width: '700px',
     disableClose:false,
     data: element
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
     this.listatbOU()
   });
 }

 openDialogcreate(element:Opcionusuario){
   const dialogRef = this.dialog.open(CrusersopcComponent, {
      width: '700px',
      disableClose:false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listatbOU()
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
