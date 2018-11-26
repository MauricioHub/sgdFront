  import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import {ServicesgetService, } from '../../../servicios/serget/servicesget.service';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Modulo} from "../../../interface/modulo";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-crmodulo',
  templateUrl: './crmodulo.component.html',
  styleUrls: ['./crmodulo.component.css']
})
export class CrmoduloComponent implements OnInit {
  value = '';
  //public modules;
  constructor(public router: Router,private crModule:ServcreatedService,private getService:ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<CrmoduloComponent>,@Inject(MAT_DIALOG_DATA) public data: Modulo) {
  /*  this.consulta();*/
   }

  ngOnInit() {
  }
  openSnackBar(nombre:string) {
    this.snackBar.open('Modulo '+nombre+' guardado exitosamente', 'OK', {
        duration: 5000,
      });
 }




Nuevo(formanv:NgForm){
  console.log(formanv.value.nombre);
  this.crModule.createModule(formanv.value.nombre).subscribe(res=>{
    console.log(res);
    this.openSnackBar(formanv.value.nombre)
      this.dialogRef.close();
},
(err:HttpErrorResponse) => {
  if(err.status == 0)
    this.showAlert('ERROR DE CONEXION!');
}

);
}
showAlert(message){
  if(window.confirm(message)){
    this.router.navigate(['/rdmodulos']);
  } else{
    this.router.navigate(['/rdmodulos']);
  }
}


}
