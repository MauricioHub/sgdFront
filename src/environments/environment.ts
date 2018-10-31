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
  sequenceURL: "http://localhost:8082/GetSequence"
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
