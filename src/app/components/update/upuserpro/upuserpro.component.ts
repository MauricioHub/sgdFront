import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {Userol} from "../../../interface/userol";
import {Authorities} from "../../../interface/Authorities";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {ServicesgetService} from '../../../servicios/serget/servicesget.service';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-upuserpro',
  templateUrl: './upuserpro.component.html',
  styleUrls: ['./upuserpro.component.css']
})
export class UpuserproComponent implements OnInit {
  constructor(public router: Router,private crusua: ServupdateService,private creusu: ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpuserproComponent>,@Inject(MAT_DIALOG_DATA) public data: Userol) { }

  ngOnInit() {
  }
openSnackBar(username:string) {
      this.snackBar.open('Usuario editado correctamente', 'OK', {
          duration: 5000,
        });
       }
deleleuserrol(formaupuserol:NgForm){
console.log(this.data.userId);
console.log(this.data.authorityId);
console.log(this.data.userName);
 console.log(this.data.authorityName);
 this.crusua.deleuserrol(formaupuserol.value.userId,formaupuserol.value.authorityId).subscribe(res=>{
 console.log(res);
  this.openSnackBar(formaupuserol.value.userName);
 this.dialogRef.close();
            },
        (err:HttpErrorResponse) => {
      if(err.status == 0){
              this.showAlert('ERROR DE CONEXION!');
               this.dialogRef.close();
          }
              if(err.status == 500){
              this.showAlert('ERROR DEL SERVIDOR!');
               this.dialogRef.close();
            }
              if(err.status == 400){
              this.showAlert('ERROR DE ACTUALIZAR LA PAGINA INTENTE DE NUEVO POR FAVOR!');
               this.dialogRef.close();
              }
              if(err.status == 401){
              this.showAlert('ERROR DE CONTENIDO!');
               this.dialogRef.close();
              }

              }
              );
          }
          showAlert(message){
          if(window.confirm(message)){
          this.router.navigate(['/home']);
          } else{
          this.router.navigate(['/home']);
           }
          }
}
