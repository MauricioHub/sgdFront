import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs';
import {ResponseModule} from '../../interface/response-module';
import {Modulo} from '../../interface/modulo';
const API_GET_MODULE=environment.API_GET_MODULE;
const API_GET_OPCIONES=environment.API_GET_OPCIONES;
const API_GET_PERFILES=environment.API_GET_PERFILES;
const API_GET_USUARIOS=environment.API_GET_USUARIOS;
const API_GET_USEROPC=environment.API_GET_USEROPC


@Injectable({
  providedIn: 'root'
})
export class ServicesgetService {


  constructor(private http:HttpClient) { }

  ///////////////////////////////////////////
  //SERVICIO DE CONSULTA PARA MODULOS///////
  /////////////////////////////////////////
  getModule(moduleId:string,moduleName:string)
    {
     let ModuleInputsCheck={
      moduleId:moduleId,
      moduleName:moduleName
     }

      return this.http.post(API_GET_MODULE,ModuleInputsCheck)
}
///////////////////////////////////////////
//SERVICIO DE CONSULTA PARA OPCIONES///////
/////////////////////////////////////////
getOpciones(optionId:string,optionName:string,moduleId:string,optionType:string)
  {
   let OptionInputsCheck  ={
      optionId:optionId,
      optionName:optionName,
      moduleId:moduleId,
      optionType:optionType


   }
    return this.http.post(API_GET_OPCIONES,OptionInputsCheck );

}

///////////////////////////////////////////
//SERVICIO DE CONSULTA PARA PERFILES///////
/////////////////////////////////////////
getPerfile(id:string,name:string )
{

  return this.http.get(API_GET_PERFILES);
}
///////////////////////////////////////////
//SERVICIO DE CONSULTA PARA USUARIOS///////
/////////////////////////////////////////
getUsiarios(id:string,username:string)
{

return this.http.get(API_GET_USUARIOS);
}
///////////////////////////////////////////
//SERVICIO DE CONSULTA PARA OPCIONES DE USUARIOS///////
/////////////////////////////////////////
getUserOpc(userId:string)
{
  let UserOptionInputsCheck={
    userId:userId
  }
  return this.http.post(API_GET_USEROPC,UserOptionInputsCheck);
}
}