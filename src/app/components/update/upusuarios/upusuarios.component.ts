import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm,FormControl, Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {Usuario} from "../../../interface/usuario";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {ServicesgetService} from '../../../servicios/serget/servicesget.service';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-upusuarios',
  templateUrl: './upusuarios.component.html',
  styleUrls: ['./upusuarios.component.css']
})
export class UpusuariosComponent implements OnInit {
  hide = true;
  public usersss;

  constructor(public router: Router,private crusua: ServupdateService,private creusu: ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpusuariosComponent>,@Inject(MAT_DIALOG_DATA) public data: Usuario) {
    this.listaidus() }

  ngOnInit() {
  }
  openSnackBar(username:string) {
    this.snackBar.open('Usuario editado correctamente', 'OK', {
        duration: 5000,
      });
 }
  editarusuario(formaedusua:NgForm){
    console.log(formaedusua.value.username);
  console.log(formaedusua.value.passwusu);
  this.crusua.updateUsuarios(this.data.username,formaedusua.value.passwusu).subscribe(res=>{
    console.log(res);
      this.openSnackBar(formaedusua.value.username);
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

    this.creusu.getUsiarios('','').subscribe((usersss:any)=>{
    console.log(usersss);
    this.usersss=usersss;
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
