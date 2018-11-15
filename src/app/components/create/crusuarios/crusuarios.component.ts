import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {ServicesgetService, } from '../../../servicios/serget/servicesget.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import {Usuario} from "../../../interface/usuario";
@Component({
  selector: 'app-crusuarios',
  templateUrl: './crusuarios.component.html',
  styleUrls: ['./crusuarios.component.css']
})
export class CrusuariosComponent implements OnInit {
 hide = true;
 public users;
  constructor(private crusua: ServcreatedService,private creusu: ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<CrusuariosComponent>,@Inject(MAT_DIALOG_DATA) public data: Usuario) {
    this.listaidus()
   }

  ngOnInit() {
  }
  openSnackBar(nombre:string) {
    this.snackBar.open('Usuario '+nombre+' guardado exitosamente', 'OK', {
        duration: 5000,
      });
 }
Nuevousu(formanvusu:NgForm)

{
  console.log(formanvusu.value.usernombre)
  console.log(formanvusu.value.passwusu)
  console.log(formanvusu.value.nombre)
  console.log(formanvusu.value.apellido)
  console.log(formanvusu.value.emailusu)
  console.log(formanvusu.value.idperfil)
this.crusua.createUsuarios(formanvusu.value.usernombre,formanvusu.value.passwusu,formanvusu.value.nombre,formanvusu.value.apellido,formanvusu.value.emailusu,formanvusu.value.cell,formanvusu.value.idperfil).subscribe(res=>{
  console.log(res);
    this.openSnackBar(formanvusu.value.nombre);
    this.dialogRef.close();

},
err=>console.log(err)
);
}

listaidus(){

  this.creusu.getPerfile('','').subscribe((users:any)=>{
  console.log(users);
  this.users=users;
  },
  err=>console.log(err))
  }
}
