import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm,FormControl, Validators } from "@angular/forms";
import {Opcionusuario} from "../../../interface/opcionusuario";
import {MatFormFieldModule} from '@angular/material/form-field';
import {ServicesgetService} from '../../../servicios/serget/servicesget.service';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-upusuariosopciones',
  templateUrl: './upusuariosopciones.component.html',
  styleUrls: ['./upusuariosopciones.component.css']
})
export class UpusuariosopcionesComponent implements OnInit {
  public users;
  public opciones;
  constructor(private cruopcusu: ServupdateService,private getopcus: ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpusuariosopcionesComponent>,@Inject(MAT_DIALOG_DATA) public data: Opcionusuario) {
    this.listaidus()
  this.litstaidopcup() }

  ngOnInit() {
  }
  openSnackBar(idusuario:string) {
    this.snackBar.open('vinculacion editada correctamente', 'OK', {
        duration: 5000,
      });
 }
  editaropcusers(formaedopcuser:NgForm){
  console.log(this.data.userId);
  console.log(formaedopcuser.value.customRadio)

  this.cruopcusu.updateUserOpc(this.data.userId,this.data.optionId,formaedopcuser.value.customRadio).subscribe(res=>{
    console.log(res);
      this.openSnackBar(formaedopcuser.value.nombre);
      this.dialogRef.close();
  },
  err=>console.log(err)
  );
  }
  listaidus(){

    this.getopcus.getUsiarios('','').subscribe((users:any)=>{
    console.log(users);
    this.users=users.users;
    },
    err=>console.log(err))
    }

    litstaidopcup(){
      this.getopcus.getOpciones('','','','').subscribe((opciones:any)=>{
      console.log(opciones);
      this.opciones=opciones.options;
      },
      err=>console.log(err))
    }
}
