import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {Usuario} from "../../../interface/usuario";
import {Authorities} from "../../../interface/Authorities";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {ServicesgetService} from '../../../servicios/serget/servicesget.service';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-updatedatos',
  templateUrl: './updatedatos.component.html',
  styleUrls: ['./updatedatos.component.css']
})
export class UpdatedatosComponent implements OnInit {
public usersss ;
public users;
constructor(public router: Router,private crusua: ServupdateService,private creusu: ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpdatedatosComponent>,@Inject(MAT_DIALOG_DATA) public data: Usuario) {
  this.listaidus();
  this. listusuario();
  }

  ngOnInit() {
  }
openSnackBar(username:string) {
    this.snackBar.open('Usuario editado correctamente', 'OK', {
        duration: 5000,
      });
     }
updatedatos(formanupdatos:NgForm){
console.log(formanupdatos.value.username);
console.log(formanupdatos.value.nombre);
console.log(formanupdatos.value.apellido);
console.log(formanupdatos.value.emailusu);
console.log(formanupdatos.value.cell);
console.log(this.data.authorities);
this.crusua.updatedatauser(this.data.username,formanupdatos.value.nombre,formanupdatos.value.apellido,formanupdatos.value.emailusu,formanupdatos.value.cell,this.data.authorities).subscribe(res=>{
console.log(res);
this.openSnackBar(formanupdatos.value.username);
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
listusuario(){
this.creusu.getUsiarios('','').subscribe((usuario:any)=>{
console.log(usuario);
this.users=usuario;
},
err=>console.log(err))
}


   updatedatosR(formanupdatos:NgForm){
     let rolID = localStorage.getItem('rolID');
    console.log(formanupdatos.value.username);
  console.log(formanupdatos.value.nombre);
   console.log(formanupdatos.value.apellido);
    console.log(formanupdatos.value.emailusu);
     console.log(formanupdatos.value.cell);
  this.crusua.updatedatauserR(this.data.username,formanupdatos.value.nombre,formanupdatos.value.apellido,formanupdatos.value.emailusu,formanupdatos.value.cell,rolID).subscribe(res=>{
    console.log(res);
      this.openSnackBar(formanupdatos.value.username);
      this.dialogRef.close();
  },
  (err:HttpErrorResponse) => {

    if(err.status == 0){

    this.showAlert('ERROR DE CONEXION!');
    }
    if(err.status == 500){

    this.showAlert('ERROR DEL SERVIDOR!');
    }


    }


    );
}


listaidus(){
this.creusu.getPerfile('','').subscribe((usersss:any)=>{
console.log(usersss);
this.usersss=usersss;
},
err=>console.log(err))
}


showAlert(message){
if(window.confirm(message)){
this.router.navigate(['/crmodulo']);
} else{
this.router.navigate(['/crmodulo']);
 }
}

}
