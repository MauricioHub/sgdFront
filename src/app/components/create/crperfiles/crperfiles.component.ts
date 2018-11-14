import { Component, OnInit,Inject  } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {Perfil} from "../../../interface/perfil";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-crperfiles',
  templateUrl: './crperfiles.component.html',
  styleUrls: ['./crperfiles.component.css']
})
export class CrperfilesComponent implements OnInit {
  constructor(private crperfil:ServcreatedService, public snackBar: MatSnackBar,public dialogRef: MatDialogRef<CrperfilesComponent>,@Inject(MAT_DIALOG_DATA) public data: Perfil) {
  }

  ngOnInit() {
  }
  openSnackBar(nombre:string) {
    this.snackBar.open('Perfil: '+nombre+' guardado exitosamente', 'OK', {
        duration: 2000,
      });
  }

Nuevoper(formanvper:NgForm){
  console.log(formanvper.value.nombre);
  this.crperfil.createperfiles(formanvper.value.nombre).subscribe(res=>{
    console.log(res);
    this.openSnackBar(formanvper.value.nombre);
      this.dialogRef.close();
},
err=>console.log(err)
);
}
}
