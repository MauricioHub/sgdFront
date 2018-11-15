import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

const API_CREATE_MODULE=environment.API_CREATE_MODULE;
const API_CREATE_OPCIONES=environment.API_CREATE_OPCIONES;
const API_CREATE_PERFILES=environment.API_CREATE_PERFILES;
const API_CREATE_USUARIOS=environment.API_CREATE_USUARIOS;
const API_CREATE_USEROPC=environment.API_CREATE_USEROPC


@Injectable({
  providedIn: 'root'
})
export class ServcreatedService {

  constructor(private http:HttpClient) { }
//----------------------------------
//----------------------------------
//METODO PARA CREAR NUEVOS MODULOS
//----------------------------------
//----------------------------------
  createModule(moduleName:string)
  {
let ModuleInputs ={
moduleName:moduleName
   }
   return this.http.post(API_CREATE_MODULE,ModuleInputs);
 }
 //----------------------------------
 //----------------------------------
 //METODO PARA CREAR NUEVOS OPCIONES
 //----------------------------------
 //----------------------------------
 createOpciones(moduleId:string,optionName:string,optionType:string)
 {
let OptionsInputs ={
moduleId:moduleId,
optionName:optionName,
optionType:optionType

  }
  return this.http.post(API_CREATE_OPCIONES,OptionsInputs);
}

 //----------------------------------
 //----------------------------------
 //METODO PARA CREAR NUEVOS PERFILES
 //----------------------------------
 //----------------------------------
 createperfiles(profileName:string)
 {
let name ={
name:profileName,

  }
  return this.http.post(API_CREATE_PERFILES,name);
}

 //----------------------------------
 //----------------------------------
 //METODO PARA CREAR NUEVOS USUARIOS
 //----------------------------------
 //----------------------------------
 createUsuarios(username:string,password:string,firstname:string,lastname:string,email:string,phonenumber:string,authorities:any[])
 {
   let authorList:any[]= [];
   authorList = [{
     "id":authorities
   }];
let name={
username:username,
password:password,
firstname:firstname,
lastname:lastname,
email:email,
phonenumber:phonenumber,
authorities:authorList
  }

  return this.http.post(API_CREATE_USUARIOS,name);
}

 //----------------------------------
 //----------------------------------
 //METODO PARA CREAR NUEVOS USUARIOS-OPCIONES
 //----------------------------------
 //----------------------------------
 createUsersOpc(userId:string,optionId:string)
 {
let UserOptionInputs ={
userId:userId,
optionId:optionId,
}
  return this.http.post(API_CREATE_USEROPC,UserOptionInputs);
}
}
