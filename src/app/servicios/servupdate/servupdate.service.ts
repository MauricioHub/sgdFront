import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const  API_UPDATE_MODULE=environment.API_UPDATE_MODULE;
const  API_UPDATE_OPCIONES=environment.API_UPDATE_OPCIONES;
const  API_UPDATE_PERFILES=environment.API_UPDATE_PERFILES;
const  API_UPDATE_USUARIOS=environment.API_UPDATE_USUARIOS;
const  API_UPDATE_USEROPC=environment.API_UPDATE_USEROPC;
const  API_DELETE_USUARIOS=environment.API_DELETE_USUARIOS;
const  API_UPDATE_USUARIOSDATA=environment.API_UPDATE_USUARIOSDATA;
const  API_DELETE_USERROL=environment.API_DELETE_USERROL;
const  API_DELETE_ROLMODULE=environment.API_DELETE_ROLMODULE;

@Injectable({
  providedIn: 'root'
})
export class ServupdateService {

  constructor(private http:HttpClient) { }

/////////////////////////////////////
//METODO PARA EDITAR MODULOS
////////////////////////////////////
updateModule(moduleId:string,moduleName:string,status:string)
{
  let ModuleInputsUpdate={
    moduleId:moduleId,
    moduleName:moduleName,
    status:status
  }
  return this.http.post(API_UPDATE_MODULE,ModuleInputsUpdate);
}

/////////////////////////////////////
//METODO PARA EDITAR OPCIONES
////////////////////////////////////
updateOpciones(optionId:string,optionName:string,status:string,moduleId:string,optionType:string)
{
  let OptionInputsUpdate={
    optionId:optionId,
    optionName:optionName,
    status:status,
    moduleId:moduleId,
    optionType:optionType,

  }
  return this.http.post(API_UPDATE_OPCIONES,OptionInputsUpdate);
}



/////////////////////////////////////
//METODO PARA EDITAR USUARIOS-OPCIONES
////////////////////////////////////
updateUserOpc(userId:string,optionId:string,status:string)
{
  let UserOptionInputsUpdate={
    userId:userId,
    optionId:optionId,
    status:status
  }
  return this.http.post(API_UPDATE_USEROPC,UserOptionInputsUpdate);
}
///////////////////////////////////////////////////////////////////////////
//METODO PARA EDITAR USUARIOS:CONTRASEÑA,DATOS PERSONALES,ACTIVO O INACTIVO
//////////////////////////////////////////////////////////////////////////
deleteusers(username:string,enabled:boolean)
{
  let user ={
    username:username,
    enabled:enabled
  }
  let httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    body:user
};

  return this.http.delete(API_DELETE_USUARIOS,httpOptions);
}
updateUsuarios(username:string,password:string)
{
  let UserInputsUpdate={
    username:username,
    password:password

  }
  return this.http.put(API_UPDATE_USUARIOS,UserInputsUpdate);
}

updatedatauser(username:string,firstname:string,lastname:string,email:string,phonenumber:string,authorities:any[]){
  let dataus={
    username:username,
    firstname:firstname,
    lastname:lastname,
    email:email,
    phonenumber:phonenumber,
    authorities:authorities
  }
  return this.http.post(API_UPDATE_USUARIOSDATA,dataus);
}



updatedatauserR(username:string,firstname:string,lastname:string,email:string,phonenumber:string,rolID:string){
  let dataus={
    username:username,
    firstname:firstname,
    lastname:lastname,
    email:email,
    phonenumber:phonenumber,
    authorities:[{
      "id":rolID
    }]
  }
  return this.http.post(API_UPDATE_USUARIOSDATA,dataus);
}

editarrol(username:string,firstname:string,lastname:string,email:string,phonenumber:string,authorities:any[])

{
  let authorList:any[]= [];
  authorList = [{
    "id":authorities
  }];
  let uproles={
    username:username,
    firstname:firstname,
    lastname:lastname,
    email:email,
    phonenumber:phonenumber,
    authorities:authorList
  }
  return this.http.post(API_UPDATE_USUARIOSDATA,uproles);

 }

 updperfill(id:string,name:string)
 {
 let perfill={
   id:id,
 name:name
 }
 return this.http.post(API_UPDATE_PERFILES,perfill);
 }

 delepromod(profileId:string,moduleId:string){
   let delrolmod ={
     profileId:profileId,
     moduleId:moduleId
   }
   return this.http.post(API_DELETE_ROLMODULE,delrolmod);
   }

   deleuserrol(profileId:string,userId:string){
     let deluserpro ={
       profileId:profileId,
       userId:userId
     }
     return this.http.post(API_DELETE_USERROL,deluserpro);
     }
}
