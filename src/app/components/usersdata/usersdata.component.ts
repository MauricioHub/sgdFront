import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";
import { AuthService } from "../../services/auth.service";
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import { UpdatedatosComponent } from '../update/updatedatos/updatedatos.component';
import {Usuario} from "../../interface/usuario";
import { Globals } from '../../app.globals';
import { Router } from '@angular/router';

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

  constructor(private _heroesService:HeroesService,
              private authService:AuthService,
              private dialog:MatDialog,
              private disableRt:Globals,
              private router: Router) {
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
      if(this.userName == usersList[p].username)
        this.profileData = usersList[p];
    }
    console.log('SOY-CHOOSE-USER-PROFILE: ');
    console.log(this.profileData);
  }

  openDialogUpdate3(element:any){
    console.log('SOY-DIALOG-UPDATE-3:!');
    console.log(element);

    const dialogReff = this.dialog.open(UpdatedatosComponent, {
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


}
