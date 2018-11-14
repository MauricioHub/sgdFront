import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm,FormControl, Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {Usuario} from "../../../interface/usuario";
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

  constructor(private crusua: ServupdateService,private creusu: ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpusuariosComponent>,@Inject(MAT_DIALOG_DATA) public data: Usuario) {
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
  err=>console.log(err)
  );
}


  listaidus(){

    this.creusu.getUsiarios('','').subscribe((usersss:any)=>{
    console.log(usersss);
    this.usersss=usersss;
    },
    err=>console.log(err))
    }

}
