import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import {ServicesgetService, } from '../../../servicios/serget/servicesget.service';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import {Rolmod} from "../../../interface/rolmod";

@Component({
  selector: 'app-crpromod',
  templateUrl: './crpromod.component.html',
  styleUrls: ['./crpromod.component.css']
})
export class CrpromodComponent implements OnInit {
  public modules;
    public usersss;
  constructor(public router:Router,private creopc:ServcreatedService,private gtopcio:ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<CrpromodComponent>,@Inject(MAT_DIALOG_DATA) public data:Rolmod) {
    this.listaidus();
    this.listaidsopc();
  }

  ngOnInit() {
  }
  openSnackBar(profileId:string) {
    this.snackBar.open('Rol '+profileId+' con nuevo modulo', 'OK', {
        duration: 5000,
      });
    }
Nuevorolmod(formanvrolmod:NgForm)

{
  console.log(formanvrolmod.value.idModule)
  console.log(formanvrolmod.value.profileId)
this.creopc.putrolmod(formanvrolmod.value.profileId,formanvrolmod.value.idModule).subscribe(res=>{
  console.log(res);
    this.openSnackBar(formanvrolmod.value.profileId);
    this.dialogRef.close();

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

listaidus(){

  this.gtopcio.getPerfile('','').subscribe((usersss:any)=>{
  console.log(usersss);
  this.usersss=usersss;
  },
  err=>console.log(err))
  }

  listaidsopc(){
      this.gtopcio.getModule('','').subscribe((modules:any)=>{
      console.log(modules);
      this.modules=modules.modulos;
      },
      (err:HttpErrorResponse) => {
        if(err.status == 0)
          this.showAlert('ERROR DE CONEXION!');

      }
    );
    }
  showAlert(message){
    if(window.confirm(message)){
      this.router.navigate(['/rdusuarios']);
    } else{
      this.router.navigate(['/rdusuarios']);
    }
  }
}
