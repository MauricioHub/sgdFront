import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {Perfil} from "../../../interface/perfil";
import {ResponseModule} from "../../../interface/response-module";
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import {UpperfilesComponent} from '../../update/upperfiles/upperfiles.component';
import { CrperfilesComponent } from '../../create/crperfiles/crperfiles.component';
import { Globals } from '../../../app.globals';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rdperfiles',
  templateUrl: './rdperfiles.component.html',
  styleUrls: ['./rdperfiles.component.css']
})
export class RdperfilesComponent implements OnInit {
displayedColumns: string[] = ['position', 'name','editar']
@ViewChild(MatPaginator) paginator:MatPaginator;
@ViewChild(MatSort) sort: MatSort;
public perfs= new MatTableDataSource();
public valid:boolean=false;
  constructor(public router: Router,private srdperfiles:ServicesgetService,public dialog:MatDialog,private disableRt:Globals ) {
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
    this.listaidus()
  this.applyFilter('') }
  applyFilter(filterValue: string) {
     this.perfs.filter = filterValue.trim().toLowerCase();}

  ngOnInit() {
}
listaidus(){

  this.srdperfiles.getPerfile('','').subscribe((perfs:any)=>{
  console.log(perfs);
  this.perfs.data=perfs;
  this.perfs.paginator=this.paginator;
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
  openDialogUpdate(element:Perfil){
    const dialogRef = this.dialog.open(UpperfilesComponent, {
       width: '500px',
       disableClose:false,
       data: element
     });

     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       this.listaidus()
     });
   }

   openDialogcreate(element:Perfil){
     const dialogRef = this.dialog.open(CrperfilesComponent, {
        width: '500px',
        disableClose:false,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.listaidus()
      });
    }

    openDialogupdate(element:Perfil){
      const dialogRef = this.dialog.open(UpperfilesComponent, {
         width: '500px',
         disableClose:false,
         data:element
       });

       dialogRef.afterClosed().subscribe(result => {
         console.log('The dialog was closed');
         this.listaidus()
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
