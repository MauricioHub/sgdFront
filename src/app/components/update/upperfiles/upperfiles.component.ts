import { Component, OnInit,Inject } from '@angular/core';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {ServicesgetService,} from '../../../servicios/serget/servicesget.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForm} from "@angular/forms";
import {Perfil} from "../../../interface/perfil";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-upperfiles',
  templateUrl: './upperfiles.component.html',
  styleUrls: ['./upperfiles.component.css']
})
export class UpperfilesComponent implements OnInit {
public perfs;
  constructor(private updperfil:ServupdateService,private getper:ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpperfilesComponent>,@Inject(MAT_DIALOG_DATA) public data: Perfil) {
  this.listaidus() }

  ngOnInit() {
  }

  openSnackBar(nombre:string) {
    this.snackBar.open('Perfil:'+nombre+' editado correctamente', 'OK', {
        duration: 5000,
      });
 }
/*editarper(formaedper:NgForm){
console.log(formaedper.value.idperfil);
console.log(formaedper.value.nombre);
console.log(formaedper.value.diasexp);
console.log(formaedper.value.intentos);
console.log(formaedper.value.customRadio);
console.log(formaedper.value.fechayhora);
console.log(formaedper.value.passlongitud);
console.log(formaedper.value.expsesion);
this.updperfil.updatePerfiles(this.data.profileId,formaedper.value.nombre,formaedper.value.diasexp,
formaedper.value.intentos,formaedper.value.customRadio,formaedper.value.fechayhora,formaedper.value.passlongitud,formaedper.value.expsesion).subscribe(res=>{
  console.log(res);
  this.openSnackBar(formaedper.value.nombre);
    this.dialogRef.close();
},
err=>console.log(err)
);

}*/

listaidus(){

  this.getper.getPerfile('','').subscribe((perfs:any)=>{
  console.log(perfs);
  this.perfs=perfs.profiles;
  },
  err=>console.log(err))
  }
}
