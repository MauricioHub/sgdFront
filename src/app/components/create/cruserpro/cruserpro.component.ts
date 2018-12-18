import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import {ServicesgetService, } from '../../../servicios/serget/servicesget.service';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import {Userol} from "../../../interface/userol";


@Component({
  selector: 'app-cruserpro',
  templateUrl: './cruserpro.component.html',
  styleUrls: ['./cruserpro.component.css']
})
export class CruserproComponent implements OnInit {
 public usersss;
 public usersop;
  constructor(public router:Router,private creopc:ServcreatedService,private gtopcio:ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<CruserproComponent>,@Inject(MAT_DIALOG_DATA) public data:Userol) {
  this.litstauser();
  this.listaidus();
  }

  ngOnInit() {
  }
  openSnackBar(userId:string) {
    this.snackBar.open('Usuario '+userId+' con nuevo rol', 'OK', {
        duration: 5000,
      });
 }
Nuevouserol(formanvuserol:NgForm)

{
  console.log(formanvuserol.value.userId)
  console.log(formanvuserol.value.profileId)
this.creopc.putuserpro(formanvuserol.value.userId,formanvuserol.value.profileId).subscribe(res=>{
  console.log(res);
    this.openSnackBar(formanvuserol.value.userId);
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
  litstauser(){
    this.gtopcio.getUsiarios('','').subscribe((usersop:any)=>{
    console.log(usersop);
    this.usersop=usersop;
    },
    err=>console.log(err))
  }
  showAlert(message){
    if(window.confirm(message)){
      this.router.navigate(['/rdusuarios']);
    } else{
      this.router.navigate(['/rdusuarios']);
    }
  }
}
