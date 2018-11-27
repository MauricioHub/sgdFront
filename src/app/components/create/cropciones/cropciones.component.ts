import { Component, OnInit , Inject} from '@angular/core';
import {NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import {ServicesgetService, } from '../../../servicios/serget/servicesget.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Opcion} from "../../../interface/opcion";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

export interface opcion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cropciones',
  templateUrl: './cropciones.component.html',
  styleUrls: ['./cropciones.component.css']
})
export class CropcionesComponent implements OnInit {
  public modules;
  selectedValue: string;
  selectedCar: string;

  constructor(public router:Router,private creopc:ServcreatedService,private gtopcio:ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<CropcionesComponent>,@Inject(MAT_DIALOG_DATA) public data: Opcion) {
this.listaidsopc()


}


  ngOnInit() {
  }

opciones:opcion[]=[
  {value: 'CONSULTA', viewValue: 'CONSULTA'},
  {value: 'CREACION', viewValue: 'CREACION'},
  {value: 'ACTUALIZACION', viewValue: 'ACTUALIZACION'},
];



  openSnackBar(nombre:string) {
    this.snackBar.open('Opciones: '+nombre+' guardado exitosamente', 'SALIR', {
        duration: 4000,
      });
  }
Nuevoopc(formanvopc:NgForm){

  console.log(formanvopc.value.idModule)
  console.log(formanvopc.value.nombre)
  this.creopc.createOpciones(formanvopc.value.idModule,formanvopc.value.nombre,formanvopc.value.nombretipo).subscribe(res=>{
    console.log(res);
  this.openSnackBar(formanvopc.value.nombre);
  this.dialogRef.close();
},
(err:HttpErrorResponse) => {
  if(err.status == 0)
    this.showAlert('ERROR DE CONEXION!');
}
);
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
      this.router.navigate(['/rdopciones']);
    } else{
      this.router.navigate(['/rdopciones']);
    }
  }

}
