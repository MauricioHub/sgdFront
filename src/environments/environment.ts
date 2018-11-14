// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiLogin:'http://localhost:8088/login/authenticate',
  apiSearch:'http://localhost:8083/v1/client',
  apiBandeja:'http://localhost:8090/Interface/Microservice/Gui/getBandeja',

  browseURL: "http://localhost:8085/SalesInfo",
  browseBatchURL: "http://localhost:8082/LotInfo",
  comissionURL: "http://localhost:8089/ComissionsInfo",
  loteURL: "http://localhost:8082/LotCreation",
  regularURL: "http://localhost:8082/LotUpdate",
  sequenceURL: "http://localhost:8082/GetSequence",

  //MODULOS
//---------------------------------------------------------
API_CREATE_MODULE:'http://10.225.13.19:9960/ModuleCreation',
//  http://10.225.13.19:9960
  API_GET_MODULE:'http://10.225.13.19:9960/GetModule',
  API_UPDATE_MODULE:'http://10.225.13.19:9960/ModuleUpdate',

//----------------------------------------------------------

//OPCIONES
//---------------------------------------------------------
  API_CREATE_OPCIONES:'http://10.225.13.19:9960/OptionCreation',
  API_GET_OPCIONES:'http://10.225.13.19:9960/GetOption',
  API_UPDATE_OPCIONES:'http://10.225.13.19:9960/OptionUpdate',

//---------------------------------------------------------

//PERFILES
//---------------------------------------------------------
  API_CREATE_PERFILES:'http://10.225.13.19:9961/authority/',
  API_GET_PERFILES:'http://10.225.13.19:9961/authority/',
  API_UPDATE_PERFILES:'http://10.225.13.19:9961/authority/',

//---------------------------------------------------------


//USUARIOS
//---------------------------------------------------------
  API_CREATE_USUARIOS:'http://10.225.13.19:9961/users/',
  API_UPDATE_USUARIOSDATA:'http://10.225.13.19:9961/userUpdate',
  API_GET_USUARIOS:'http://10.225.13.19:9961/users/',
  API_UPDATE_USUARIOS:'http://10.225.13.19:9961/users/',
  API_DELETE_USUARIOS:'http://10.225.13.19:9961/users/',

//---------------------------------------------------------

//USUARIOS-OPCIONES
//---------------------------------------------------------
  API_CREATE_USEROPC:'http://10.225.13.19:9960/SetUserOption',
  API_GET_USEROPC:'http://10.225.13.19:9960/GetUserOption',
  API_UPDATE_USEROPC:'http://10.225.13.19:9960/UpdateUserOption',



//AUTENTICACION
API_LOGIN:'http://10.225.13.19:9961/auth/'

};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
