import { Component, OnInit,Inject } from '@angular/core';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {ServicesgetService, } from '../../../servicios/serget/servicesget.service';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import {Modulo} from "../../../interface/modulo";
@Component({
  selector: 'app-upmodulos',
  templateUrl: './upmodulos.component.html',
  styleUrls: ['./upmodulos.component.css']
})
export class UpmodulosComponent implements OnInit {

  favoriteSeason: string;
    seasons: string[] = ['INACTIVO', 'ACTIVO'];

public modules;
  constructor(public router:Router,private upModulo:ServupdateService, private getmodu:ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpmodulosComponent>,@Inject(MAT_DIALOG_DATA) public data: Modulo) {

  }


  ngOnInit() {
  }
  openSnackBar(nombre:string) {
    this.snackBar.open('Modulo:'+nombre+' editado correctamente', 'OK', {
        duration: 5000,
      });
 }
editar(formaed:NgForm){
  console.log(this.data.moduleId);
  console.log(formaed.value.nombre);
  console.log(formaed.value.customRadio);
  this.upModulo.updateModule(this.data.moduleId,formaed.value.nombre,formaed.value.customRadio).subscribe(res=>{
    console.log(res);
    this.openSnackBar(formaed.value.nombre);
    this.dialogRef.close();
  },
  (err:HttpErrorResponse) => {
    if(err.status == 0)
      this.showAlert('ERROR DE CONEXION!');
  }

);
}
listaids(){

  this.getmodu.getModule('','').subscribe((modules:any)=>{
  console.log(modules);
  this.modules=modules.modulos;
},
err=>console.log(err))
}
showAlert(message){
  if(window.confirm(message)){
    this.router.navigate(['/upmodulos']);
  } else{
    this.router.navigate(['/upmodulos']);
  }
}
}
