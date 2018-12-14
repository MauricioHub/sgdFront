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
  API_UPDATE_PERFILES:'http://10.225.13.19:9961/authorityUpdate/',

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

  //---------------------------------------------------------

  //USUARIOS-ROLES
  //---------------------------------------------------------
API_GET_USERROL:'http://10.225.13.19:9960/GetUserProfile',
API_PUT_USERROL:'http://10.225.13.19:9960/PutUserProfile',
API_DELETE_USERROL:'http://10.225.13.19:9960/DeleteProfileModule',

//ROLES-MODULOS
//---------------------------------------------------------
API_GET_ROLMODULE:'http://10.225.13.19:9960/GetProfileModule',
API_PUT_ROLMODULE:'http://10.225.13.19:9960/PutProfileModule',
API_DELETE_ROLMODULE:'http://10.225.13.19:9960/DeleteUserProfile ',
//AUTENTICACION
API_LOGIN:'http://10.225.13.19:9961/auth/',


//DIGITALIZACION TRABABILIDAD Y ARCHIVAMIENTO
API_GET_FILETRACE:'http://10.225.13.19:9964/GetFileTrace',
API_GET_DIGITALTRACE:'http://10.225.13.19:9964/GetDigitalTrace',
API_GET_FILESTORE:'http://10.225.13.19:9964/GetFileStore',

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////LEVANTADOS DE MANERA LOCAL//////////////////'http://localhost:8088/login/authenticate'
///////////////////////////////////////////////////////////
/*
  //MODULOS
//---------------------------------------------------------
API_CREATE_MODULE:'http://localhost:8090/ModuleCreation',
API_GET_MODULE:'http://localhost:8090/GetModule',
API_UPDATE_MODULE:'http://localhost:8090/ModuleUpdate',

//----------------------------------------------------------

//OPCIONES
//---------------------------------------------------------
  API_CREATE_OPCIONES:'http://localhost:8090/OptionCreation',
  API_GET_OPCIONES:'http://localhost:8090/GetOption',
  API_UPDATE_OPCIONES:'http://localhost:8090/OptionUpdate',

//---------------------------------------------------------

//PERFILES
//---------------------------------------------------------
  API_CREATE_PERFILES:'http://localhost:9998/authority/',
  API_GET_PERFILES:'http://localhost:9998/authority/',
  API_UPDATE_PERFILES:'http://localhost:9998/authorityUpdate/',

//---------------------------------------------------------


//USUARIOS
//---------------------------------------------------------
  API_CREATE_USUARIOS:'http://localhost:9998/users/',
  API_UPDATE_USUARIOSDATA:'http://localhost:9998/userUpdate',
  API_GET_USUARIOS:'http://localhost:9998/users/',
  API_UPDATE_USUARIOS:'http://localhost:9998/users/',
  API_DELETE_USUARIOS:'http://localhost:9998/users/',

//---------------------------------------------------------

//USUARIOS-OPCIONES
//---------------------------------------------------------
  API_CREATE_USEROPC:'http://localhost:8090/SetUserOption',
  API_GET_USEROPC:'http://localhost:8090/GetUserOption',
  API_UPDATE_USEROPC:'http://localhost:8090/UpdateUserOption',

  //---------------------------------------------------------

  //USUARIOS-ROLES
  //---------------------------------------------------------
API_GET_USERROL:'http://localhost:8090/GetUserProfile',

//ROLES-MODULOS
//---------------------------------------------------------
API_GET_ROLMODULE:'http://localhost:8090/GetProfileModule ',

//AUTENTICACION
API_LOGIN:'http://10.225.13.19:9961/auth/',


//DIGITALIZACION TRABABILIDAD Y ARCHIVAMIENTO
API_GET_FILETRACE:'http://localhost:8095/GetFileTrace',
API_GET_DIGITALTRACE:'http://localhost:8095/GetDigitalTrace',
API_GET_FILESTORE:'http://localhost:8095/GetFileStore'
*/


};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
