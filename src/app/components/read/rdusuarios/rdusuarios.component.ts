import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {Usuario} from "../../../interface/usuario";
import {ResponseModule} from "../../../interface/response-module";
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import {UpusuariosComponent} from '../../update/upusuarios/upusuarios.component';
import {CrusuariosComponent } from '../../create/crusuarios/crusuarios.component';
import { EstadousuarioComponent } from '../../update/estadousuario/estadousuario.component';
import { UpdatedatosComponent } from '../../update/updatedatos/updatedatos.component';
import { Globals } from '../../../app.globals';
import {UpdaterolComponent} from '../../update/updaterol/updaterol.component';



@Component({
  selector: 'app-rdusuarios',
  templateUrl: './rdusuarios.component.html',
  styleUrls: ['./rdusuarios.component.css']
})
export class RdusuariosComponent implements OnInit {
  displayedColumns: string[] = ['name','nombre','cell','estado','telefono','email','editar','editar2','editar3','editar4']
  @ViewChild(MatPaginator) paginator:MatPaginator;
  public userslist = new MatTableDataSource();
  public perfs;
  constructor(private rdusuarios:ServicesgetService, public dialog:MatDialog,private disableRt:Globals ){
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
  this.listaiduss()
  }
  applyFilter(filterValue: string) {
     this.userslist.filter = filterValue.trim().toLowerCase();}
  ngOnInit() {
  }
listaiduss(){
  this.rdusuarios.getUsiarios('','').subscribe((userslist:any)=>{
  console.log(userslist);
  this.userslist.data=userslist;
    this.userslist.paginator = this.paginator;
  },
  err=>console.log(err))
}


  openDialogUpdate(element:Usuario){
    const dialogRef = this.dialog.open(UpusuariosComponent, {
       width: '500px',
       disableClose:true,
       data: element
     });

     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       this.listaiduss()
     });
   }


   openDialogcreate(element:Usuario){
     const dialogRef = this.dialog.open(CrusuariosComponent, {
        width: '500px',
        height: '700px',
        disableClose:false,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.listaiduss()
      });
    }


    openDialogUpdate2(element:Usuario){
      const dialogReff = this.dialog.open(EstadousuarioComponent, {
         width: '500px',
         disableClose:false,
         data: element
       });

       dialogReff.afterClosed().subscribe(result => {
         console.log('The dialog was closed');
         this.listaiduss()
       });
     }
     openDialogUpdate3(element:Usuario){
       const dialogReff = this.dialog.open(UpdatedatosComponent, {
          width: '500px',
          disableClose:false,
          data: element
        });

        dialogReff.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.listaiduss()
        });
      }

      openDialogUpdate4(element:Usuario){
        const dialogReff = this.dialog.open(UpdaterolComponent, {
           width: '500px',
           disableClose:false,
           data: element
         });

         dialogReff.afterClosed().subscribe(result => {
           console.log('The dialog was closed');
           this.listaiduss()
         });
       }



}
