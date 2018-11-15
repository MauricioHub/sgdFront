import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import {ServicesgetService, } from '../../../servicios/serget/servicesget.service';
import { NgForm } from "@angular/forms";
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
  constructor(private crModule:ServcreatedService,private getService:ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<CrmoduloComponent>,@Inject(MAT_DIALOG_DATA) public data: Modulo) {
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
err=>console.log(err)
);
}



}
