import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Usuario} from "../../../interface/usuario";
import {Authorities} from "../../../interface/Authorities";
import {ServicesgetService} from '../../../servicios/serget/servicesget.service';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-updaterol',
  templateUrl: './updaterol.component.html',
  styleUrls: ['./updaterol.component.css']
})
export class UpdaterolComponent implements OnInit {
public usersss ;
  constructor(public router: Router,private crusua: ServupdateService,private creusu: ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpdaterolComponent>,@Inject(MAT_DIALOG_DATA) public data: Usuario,) {
this.listaidus();
   }

  ngOnInit() {
  }
  openSnackBar(username:string) {
    this.snackBar.open('Usuario editado correctamente', 'OK', {
        duration: 5000,
      });
     }
     updateroles(formanuprol:NgForm){
          console.log(formanuprol.value.idperfil);
     this.crusua.editarrol(this.data.username,this.data.firstname,this.data.lastname,this.data.email,this.data.phonenumber,formanuprol.value.idperfil).subscribe(res=>{
       console.log(res);
         this.openSnackBar(formanuprol.value.username);
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
