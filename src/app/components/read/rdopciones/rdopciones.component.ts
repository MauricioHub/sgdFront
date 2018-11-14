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
  constructor(private srdopciones:ServicesgetService, public dialog:MatDialog,) {
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
    err=>console.log(err))
  }

  litstamodulo(){
    this.srdopciones.getModule('','').subscribe((modulos:any)=>{
    console.log(modulos);
    this.modulos.data=modulos.modules;
    this.modulos.paginator = this.paginator;
    },
    err=>console.log(err))
  }
  openDialogUpdate(element:Opcion){
    const dialogRef = this.dialog.open(UpopcionesComponent, {
       width: '500px',
         disableClose:true,
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
        disableClose:true,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.litstaidopcup()
      });
    }

}
