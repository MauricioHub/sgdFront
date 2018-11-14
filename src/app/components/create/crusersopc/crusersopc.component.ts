import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm } from "@angular/forms";
import {Opcionusuario} from "../../../interface/opcionusuario";
import {MatFormFieldModule} from '@angular/material/form-field';
import {ServicesgetService, } from '../../../servicios/serget/servicesget.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-crusersopc',
  templateUrl: './crusersopc.component.html',
  styleUrls: ['./crusersopc.component.css']
})
export class CrusersopcComponent implements OnInit {
public usersop;
public opciones;

  constructor(private cruopcusu: ServcreatedService,private getopcus: ServicesgetService,  public snackBar: MatSnackBar,public dialogRef: MatDialogRef<CrusersopcComponent>,@Inject(MAT_DIALOG_DATA) public data: Opcionusuario) {
  this.litstaidopcup()
  this.litstauser()
}

  ngOnInit() {
  }
  openSnackBar(idusuario:string) {
    this.snackBar.open('ID:'+idusuario+' vinculado', 'SALIR', {
        duration: 5000,
      });
  }
  nuevoopcuser(formanvopcusers:NgForm){
  console.log(formanvopcusers.value.idusuario);
  console.log(formanvopcusers.value.idopcion);
  this.cruopcusu.createUsersOpc(formanvopcusers.value.idusuario,formanvopcusers.value.idopcion).subscribe(res=>{
    console.log(res);
      this.openSnackBar(formanvopcusers.value.idusuario);
          this.dialogRef.close();
  },
  err=>console.log(err)
  );
  }

    litstaidopcup(){
      this.getopcus.getOpciones('','','','').subscribe((opciones:any)=>{
      console.log(opciones);
      this.opciones=opciones.options;
      },
      err=>console.log(err))
    }

litstauser(){
  this.getopcus.getUsiarios('','').subscribe((usersop:any)=>{
  console.log(usersop);
  this.usersop=usersop;
  },
  err=>console.log(err))
}
}
