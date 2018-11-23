import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {Usuario} from "../../../interface/usuario";
import {Authorities} from "../../../interface/Authorities";
import {ServicesgetService} from '../../../servicios/serget/servicesget.service';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-updaterol',
  templateUrl: './updaterol.component.html',
  styleUrls: ['./updaterol.component.css']
})
export class UpdaterolComponent implements OnInit {
public usersss ;
  constructor(private crusua: ServupdateService,private creusu: ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpdaterolComponent>,@Inject(MAT_DIALOG_DATA) public data: Usuario,) {
this.listaidus();
   }

  ngOnInit() {
  }
  openSnackBar(username:string) {
    this.snackBar.open('Usuario editado correctamente', 'OK', {
        duration: 5000,
      });
     }
     updateroles(formanuprol:NgForm){
          console.log(formanuprol.value.idperfil);
     this.crusua.editarrol(this.data.username,this.data.firstname,this.data.lastname,this.data.email,this.data.phonenumber,formanuprol.value.idperfil).subscribe(res=>{
       console.log(res);
         this.openSnackBar(formanuprol.value.username);
         this.dialogRef.close();
     },
     err=>console.log(err)
     );
   }
   listaidus(){

     this.creusu.getPerfile('','').subscribe((usersss:any)=>{
     console.log(usersss);
     this.usersss=usersss;
     },
     err=>console.log(err))
     }

}
