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
import {Observable} from 'rxjs';import { CrusersopcComponent } from '../../create/crusersopc/crusersopc.component';
import { Globals } from '../../../app.globals';
@Component({
  selector: 'app-rdusersopc',
  templateUrl: './rdusersopc.component.html',
  styleUrls: ['./rdusersopc.component.css']
})
export class RdusersopcComponent implements OnInit {
  displayedColumns: string[] = ['name','weight','estado','tipo','opcestado','modu','modestado', 'editar']
  @ViewChild(MatPaginator) paginator:MatPaginator;
  public usersopclist= new MatTableDataSource();
public valid:boolean=false;
  constructor(private rsuseropc:ServicesgetService,public dialog: MatDialog,private disableRt:Globals ) {
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
  err=>console.log(err))
}
openDialogUpdate(element:Opcionusuario){
  const dialogRef = this.dialog.open(UpusuariosopcionesComponent, {
     width: '700px',
     disableClose:true,
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
      disableClose:true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.listatbOU()
    });
  }

}
