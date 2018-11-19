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
  constructor(private srdmodulo:ServicesgetService,public dialog: MatDialog,private disableRt:Globals ){
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
err=>console.log(err))
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

}
