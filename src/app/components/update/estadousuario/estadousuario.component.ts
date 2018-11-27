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
  selector: 'app-estadousuario',
  templateUrl: './estadousuario.component.html',
  styleUrls: ['./estadousuario.component.css']
})
export class EstadousuarioComponent implements OnInit {

  public usersss;

  constructor(public router: Router,private crusuaa: ServupdateService,private creusuu: ServicesgetService,public snackBar: MatSnackBar,public dialogReff: MatDialogRef<EstadousuarioComponent>,@Inject(MAT_DIALOG_DATA) public data: Usuario) {
    this.listaidus() }

  ngOnInit() {
  }
  openSnackBar(username:string) {
    this.snackBar.open('Usuario:'+username+' editado correctamente', 'OK', {
        duration: 5000,
      });
 }

  estado(formaestado:NgForm){
  console.log(formaestado.value.username);
  console.log(formaestado.value.enabled);
  this.crusuaa.deleteusers(this.data.username,formaestado.value.enabled).subscribe(res=>{
    console.log(res);
      this.dialogReff.close();

  },
  (err:HttpErrorResponse) => {

if(err.status == 0)

this.showAlert('ERROR DE CONEXION!');

}


);

  }
  listaidus(){

    this.creusuu.getUsiarios('','').subscribe((usersss:any)=>{
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
