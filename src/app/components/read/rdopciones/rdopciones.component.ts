import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {Opcion} from "../../../interface/opcion";
import {ResponseModule} from "../../../interface/response-module";
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import {UpopcionesComponent} from '../../update/upopciones/upopciones.component';
import { CrmoduloComponent } from '../../create/crmodulo/crmodulo.component';
import { CropcionesComponent } from '../../create/cropciones/cropciones.component';
import { Globals } from '../../../app.globals';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rdopciones',
  templateUrl: './rdopciones.component.html',
  styleUrls: ['./rdopciones.component.css']
})
export class RdopcionesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight','weightt','editar'];

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public opciones = new MatTableDataSource();
  public modulos = new MatTableDataSource();
  public valid:boolean=false;
  constructor(public router: Router,private srdopciones:ServicesgetService, public dialog:MatDialog,private disableRt:Globals ) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
  this.litstaidopcup()
  this.applyFilter('')
  }
    applyFilter(filterValue: string) {
       this.opciones.filter = filterValue.trim().toLowerCase();}

  ngOnInit() {

  }

  litstaidopcup(){
    this.srdopciones.getOpciones('','','','').subscribe((opciones:any)=>{
    console.log(opciones);
    this.opciones.data=opciones.options;
    this.opciones.paginator = this.paginator;
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

  litstamodulo(){
    this.srdopciones.getModule('','').subscribe((modulos:any)=>{
    console.log(modulos);
    this.modulos.data=modulos.modules;
    },
    err=>console.log(err))
  }
  openDialogUpdate(element:Opcion){
    const dialogRef = this.dialog.open(UpopcionesComponent, {
       width: '500px',
         disableClose:false,
       data: element
     });

     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       this.litstaidopcup()
     });
   }

   openDialogcreate(element:Opcion){
     const dialogRef = this.dialog.open(CropcionesComponent, {
        width: '500px',
        disableClose:false,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.litstaidopcup()
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
