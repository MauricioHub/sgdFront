import { Component, OnInit,Inject } from '@angular/core';
import { NgForm } from "@angular/forms";
import {Opcion} from "../../../interface/opcion";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {ServicesgetService, } from '../../../servicios/serget/servicesget.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

export interface opcion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-upopciones',
  templateUrl: './upopciones.component.html',
  styleUrls: ['./upopciones.component.css']
})
export class UpopcionesComponent implements OnInit {
public modules;
public opciones;
selectedValue: string;
selectedCar: string;
  constructor(public router:Router,private upOpcion:ServupdateService, private getopc:ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpopcionesComponent>,@Inject(MAT_DIALOG_DATA) public data: Opcion) {
this.litstaidopcup(),
this.litstaidmodup()
  }

  ngOnInit() {
  }
  opcioness:opcion[]=[
    {value: 'CONSULTA', viewValue: 'CONSULTA'},
    {value: 'CREACION', viewValue: 'CREACION'},
    {value: 'ACTUALIZACION', viewValue: 'ACTUALIZACION'},
  ];


  openSnackBar(nombre:string) {
    this.snackBar.open('Opcion:'+nombre+' editada correctamente', 'OK', {
        duration: 5000,
      });
 }
  editaropc(formaedopc:NgForm){
    console.log(formaedopc.value.optionId);
    console.log(formaedopc.value.nombre);
      console.log(formaedopc.value.idmodulo);
    console.log(formaedopc.value.customRadio);
    this.upOpcion.updateOpciones(this.data.optionId,formaedopc.value.nombre,formaedopc.value.customRadio,formaedopc.value.idmodulo,formaedopc.value.nombretipo).subscribe(res=>{
      console.log(res);
        this.openSnackBar(formaedopc.value.nombre);
          this.dialogRef.close();
    },
    (err:HttpErrorResponse) => {
      if(err.status == 0)
        this.showAlert('ERROR DE CONEXION!');
    }
  );
  }

  litstaidopcup(){
    this.getopc.getOpciones('','','','').subscribe((opciones:any)=>{
    console.log(opciones);
    this.opciones=opciones.options;
    },
    err=>console.log(err))
  }

  litstaidmodup(){
    this.getopc.getModule('','').subscribe((modules:any)=>{
    console.log(modules);
    this.modules=modules.modulos;
  },
  err=>console.log(err))
  }
  showAlert(message){
    if(window.confirm(message)){
      this.router.navigate(['/rdopciones']);
    } else{
      this.router.navigate(['/rdopciones']);
    }
  }

}
