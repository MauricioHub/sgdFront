import { Component, OnInit,Inject } from '@angular/core';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {ServicesgetService,} from '../../../servicios/serget/servicesget.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForm} from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Perfil} from "../../../interface/perfil";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-upperfiles',
  templateUrl: './upperfiles.component.html',
  styleUrls: ['./upperfiles.component.css']
})
export class UpperfilesComponent implements OnInit {
public perfs:Perfil;
  constructor(public router:Router,private updperfil:ServupdateService,private getper:ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpperfilesComponent>,@Inject(MAT_DIALOG_DATA) public data: Perfil) {
 }

  ngOnInit() {
  }

  openSnackBar(nombre:string) {
    this.snackBar.open('Perfil:'+nombre+' editado correctamente', 'OK', {
        duration: 5000,
      });
 }
editarper(formaedper:NgForm){
console.log(formaedper.value.id);
console.log(formaedper.value.nombre);
this.updperfil.updperfill(this.data.id,formaedper.value.nombre).subscribe(res=>{
  console.log(res);
  this.openSnackBar(formaedper.value.nombre);
    this.dialogRef.close();
},
(err:HttpErrorResponse) => {
  if(err.status == 0)
    this.showAlert('ERROR DE CONEXION!');
}

);

}

listaidus(){
console.log('m')
  this.getper.getPerfile('','').subscribe((perfs:Perfil)=>{
  console.log("* "+perfs);
  this.perfs=perfs;
  },
  err=>console.log(err))
  }
  showAlert(message){
    if(window.confirm(message)){
      this.router.navigate(['/upmodulos']);
    } else{
      this.router.navigate(['/upmodulos']);
    }
  }
}
