import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";
import { AuthService } from "../../services/auth.service";

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
              private authService:AuthService) { 
    
    this.userName = localStorage.getItem('logged_username');
    this.listaidus();
    this._heroesService.getUsuarios()
    .subscribe( data=>{
        //console.log('SOY USERS-DATA-COMPONENT: ');
        //console.log(data);
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
    console.log('SOY-USER-PROFILE-CHOOSE: ');
    //console.log(usersList);

    var p;
    var lenUsersL = usersList.length;
    for(p=0; p<lenUsersL; p++){
      switch(usersList[p].username){
        case 'dagerld':
          this.profileData = usersList[p];
          break;
        case 'arosario':
          this.profileData = usersList[p];
          break;
        case 'sdiaz':
          this.profileData = usersList[p];
          break;
        case 'guzmanmauc':
          this.profileData = usersList[p];
          break;
        case 'hzambrano':
          this.profileData = usersList[p];
          break;
      }

    }
    console.log(this.profileData);

  }


}
