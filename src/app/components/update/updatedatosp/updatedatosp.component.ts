import { Component, OnInit, Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {Usuario} from "../../../interface/usuario";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Authorities} from "../../../interface/Authorities";
import {ServicesgetService} from '../../../servicios/serget/servicesget.service';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-updatedatosp',
  templateUrl: './updatedatosp.component.html',
  styleUrls: ['./updatedatosp.component.css']
})
export class UpdatedatospComponent implements OnInit {
  public usersss ;

  constructor(public router: Router,
              private crusua: ServupdateService,
              private creusu: ServicesgetService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<UpdatedatospComponent>,
              @Inject(MAT_DIALOG_DATA) 
              public data: Usuario) {
    this.listaidus();
  }

  ngOnInit() {
  }


  openSnackBar(username:string) {
    this.snackBar.open('Usuario editado correctamente', 'OK', {
        duration: 5000,
    });
  }


  updatedatos(formanupdatos:NgForm){
    let rolID = localStorage.getItem('rolID');
    console.log(formanupdatos.value.username);
    console.log(formanupdatos.value.nombre);
    console.log(formanupdatos.value.apellido);
    console.log(formanupdatos.value.emailusu);
    console.log(formanupdatos.value.cell);
    this.crusua.updatedatauserR(this.data.username,
                                formanupdatos.value.nombre,
                                formanupdatos.value.apellido,
                                formanupdatos.value.emailusu,
                                formanupdatos.value.cell,rolID).subscribe(res=>{
      console.log(res);
        this.openSnackBar(formanupdatos.value.username);
        this.dialogRef.close();
    },
    (err:HttpErrorResponse) => {

    if(err.status == 0)

    this.showAlert('ERROR DE CONEXION!');

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
