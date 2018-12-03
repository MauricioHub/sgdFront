import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";
import { AuthService } from "../../services/auth.service";
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UpdatedatospComponent } from '../update/updatedatosp/updatedatosp.component';
import {Usuario} from "../../interface/usuario";
import { Globals } from '../../app.globals';
import { Router } from '@angular/router';
import * as bcrypt from 'bcrypt';

@Component({
  selector: 'app-usersdata',
  templateUrl: './usersdata.component.html',
  styleUrls: ['./usersdata.component.css']
})

export class UsersdataComponent implements OnInit {

  private userName:string = '';
  private userId:string = '';
  private profileData:any;
  public dateee;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  passwordCl = 'admin123';
  inputEnabledS:boolean = false;
  inputEnabledT:boolean = false;

  constructor(private _heroesService:HeroesService,
              private authService:AuthService,
              private dialog:MatDialog,
              private disableRt:Globals,
<<<<<<< HEAD
              private router: Router) {
=======
              private router: Router,
              private _formBuilder: FormBuilder) { 
>>>>>>> 1ba45bba3aa65ae960dc153d672bf56d675984f6
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;

    this.userName = localStorage.getItem('logged_username');
    this.listaidus();
    this._heroesService.getUsuarios()
    .subscribe( data=>{
        this.chooseUserProfile(data);
    });
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  listaidus(){
    this._heroesService.updatedatauser(this.userName,'','','','')
    .subscribe((data:any)=>{
      console.log(data);
      this.dateee=data;
    },
    err=>console.log(err));

  }

  chooseUserProfile(usersList:any[]){
    var p;
    var lenUsersL = usersList.length;
    var userEmpty:any = {
      username:'',
      password:'',
      firstname:'',
      lastname:'',
      phonenumber:'',
      id:'',
      email:''
    };
    this.profileData = userEmpty;

    for(p=0; p<lenUsersL; p++){
      if(this.userName == usersList[p].username){
        this.profileData = usersList[p];
        localStorage.setItem('passWord',usersList[p].password);
      }
        
    }
    console.log('SOY-CHOOSE-USER-PROFILE: ');
    console.log(this.profileData);
  }

  openDialogUpdate3(element:any){
    console.log('SOY-DIALOG-UPDATE-3:!');
    console.log(element);

    const dialogReff = this.dialog.open(UpdatedatospComponent, {
      width: '500px',
      disableClose:false,
      data: element
    });

    dialogReff.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this._heroesService.getUsuarios()
      .subscribe( data=>{
          this.chooseUserProfile(data);
      });
      //this.listaidus();
    });

  }
<<<<<<< HEAD
=======
  
  mostrarConsola(){
    console.log("SOY-NOSTRAR-CONSOLA1: ");
    console.log(this.firstFormGroup.value.firstCtrl);

    console.log("SOY-NOSTRAR-CONSOLA2: ");
    console.log(this.secondFormGroup.value.secondCtrl);

    console.log("SOY-NOSTRAR-CONSOLA3: ");
    console.log(this.thirdFormGroup.value.thirdCtrl);

    if(this.firstFormGroup.value.firstCtrl == this.passwordCl){
      console.log('CONTRASEÑAS COINCIDEN!!');
      this.inputEnabledS = true;

    } else{
      console.log('CONTRASEÑAS NO-COINCIDEN!!');
      this.inputEnabledS = false;

    }

    if(this.firstFormGroup.value.firstCtrl == this.firstFormGroup.value.secondCtrl){
      console.log('CONTRASEÑAS COINCIDEN!!');
      this.inputEnabledT = true;

    } else{
      console.log('CONTRASEÑAS NO-COINCIDEN!!');
      this.inputEnabledT = false;

    }
      

  /*  bcrypt.compare('somePassword', this.firstFormGroup.value.firstCtrl, function(err, res) {
      if(res) {
       // Passwords match
       console.log('PASSWORD-MATCH!');
      } else {
       // Passwords don't match
       console.log('PASSWORD-DONT-MATCH!');
      } 
    }); */


  }
>>>>>>> 1ba45bba3aa65ae960dc153d672bf56d675984f6


}
