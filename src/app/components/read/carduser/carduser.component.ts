import { Component, OnInit,Inject } from '@angular/core';
import {ServcreatedService,} from '../../../servicios/servcreated/servcreated.service';
import { NgForm } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {Usuario} from "../../../interface/usuario";
import {Authorities} from "../../../interface/Authorities";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {ServicesgetService} from '../../../servicios/serget/servicesget.service';
import {ServupdateService} from '../../../servicios/servupdate/servupdate.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-carduser',
  templateUrl: './carduser.component.html',
  styleUrls: ['./carduser.component.css']
})
export class CarduserComponent implements OnInit {
public users;
  constructor(public router: Router,private creusu: ServicesgetService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<CarduserComponent>,@Inject(MAT_DIALOG_DATA) public data: Usuario) { }

  ngOnInit() {
  }

  listusuario(){
  this.creusu.getUsiarios('','').subscribe((usuario:any)=>{
  console.log(usuario);
  this.users=usuario;
  },
  err=>console.log(err))
  }

}
