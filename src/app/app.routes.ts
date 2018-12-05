import { RouterModule, Routes } from '@angular/router';
//import { HeroesComponent } from "./components/heroes/heroes.component";
//import { HeroeComponent } from "./components/heroes/heroe.component";
import { AppComponent } from './app.component';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { BrowseComponent } from "./components/browse/browse.component";
import { BrowsebatchComponent } from "./components/browse/browsebatch.component";
import { DataTableComponent } from './components/data-table/data-table.component';
import { SalesComponent } from "./components/sales/sales.component";
import { BatchesComponent } from "./components/batches/batches.component";
import { FeesComponent } from "./components/fees/fees.component";
import { FeeComponent } from "./components/fees/fee.component";
import { ProfilesComponent } from "./components/profiles/profiles.component";
import { UsersdataComponent } from "./components/usersdata/usersdata.component";
import { PanelComponent } from "./components/panel/panel.component";
import { ItemDetails } from './components/item-details/item-details';
import { OrderComponent } from './components/order/order';
import { StatComponent } from './components/stat/stat.component';
import { RoleguardService } from './services/roleguard.service';
import { AuthguardService } from './services/authguard.service';

import { CrmoduloComponent } from './components/create/crmodulo/crmodulo.component';
import { CropcionesComponent } from './components/create/cropciones/cropciones.component';
import { CrperfilesComponent } from './components/create/crperfiles/crperfiles.component';
import { CrusuariosComponent } from './components/create/crusuarios/crusuarios.component';
import { CrusersopcComponent } from './components/create/crusersopc/crusersopc.component';

//import de read
import { RdmodulosComponent } from './components/read/rdmodulos/rdmodulos.component';
import { RdopcionesComponent } from './components/read/rdopciones/rdopciones.component';
import { RdperfilesComponent } from './components/read/rdperfiles/rdperfiles.component';
import { RdusuariosComponent } from './components/read/rdusuarios/rdusuarios.component';
import { RdusersopcComponent } from './components/read/rdusersopc/rdusersopc.component';
import { RdtrazabilidadComponent } from './components/read/rdtrazabilidad/rdtrazabilidad.component';
import { RdarchivosComponent } from './components/read/rdarchivos/rdarchivos.component';
import { RddigitalComponent } from './components/read/rddigital/rddigital.component';
import { UserrolComponent } from './components/read/userrol/userrol.component';
import { RolmoduleComponent } from './components/read/rolmodule/rolmodule.component';




//import de update
import { UpmodulosComponent } from './components/update/upmodulos/upmodulos.component';
import { UpopcionesComponent } from './components/update/upopciones/upopciones.component';
import { UpperfilesComponent } from './components/update/upperfiles/upperfiles.component';
import { UpusuariosComponent } from './components/update/upusuarios/upusuarios.component';
import { UpusuariosopcionesComponent } from './components/update/upusuariosopciones/upusuariosopciones.component';
import { EstadousuarioComponent } from './components/update/estadousuario/estadousuario.component';
import { UpdatedatosComponent } from './components/update/updatedatos/updatedatos.component';
import { UpdatedatospComponent } from './components/update/updatedatosp/updatedatosp.component';
import {UpdaterolComponent} from './components/update/updaterol/updaterol.component';



//import { BrowseComponentd } from './components/home/browse.component';
/*
//import { PreciosComponent } from "./components/precios/precios.component";
//import { ProtegidaComponent } from "./components/protegida/protegida.component";
//import { AuthGuardService } from './services/auth-guard.service'; */


const APP_ROUTES: Routes = [
//  { path: 'heroes', component: HeroesComponent },
//  { path: 'heroe/:id', component: HeroeComponent },
  { path: 'approot', component: AppComponent,	canActivate: [ AuthguardService ] },
  { path: 'home', component: HomeComponent,	canActivate: [ AuthguardService ] },
  { path: 'login', component: LoginComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'browseBatch', component: BrowsebatchComponent },
  { path: 'datatable', component: DataTableComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'usersdata', component: UsersdataComponent },
  { path: 'digital', component: RddigitalComponent,	canActivate: [RoleguardService],data:{
    rol:'42',
    dig:'162',
   }
   },
   { path: 'file', component: RdarchivosComponent,	canActivate: [RoleguardService],data:{
     rol:'42',
     archi:'163',
    }
    },
  { path: 'trazabilidad', component: RdtrazabilidadComponent,	canActivate: [RoleguardService],data:{
    rol:'42',
    jefecac:'89',
    cac:'81',
   }
   },
  { path: 'updrol', component: UpdaterolComponent,	canActivate: [RoleguardService],data:{
    rol:'42',
   }
   },

  { path: 'panel', component: PanelComponent,	canActivate: [RoleguardService],data:{
    rol:'42',
   }
   },
  { path: 'sales', component: SalesComponent,	canActivate: [RoleguardService],data:{
      rol:'42',
      vend:'43',
      jefecac:'89',
      cac:'81',
     }
     },
    { path: 'batches', component: BatchesComponent,	canActivate: [ RoleguardService ],data:{
      rol:'42',
      jefecac:'89',
      cac:'81',

     }
     },
    { path: 'fees', component: FeesComponent,	canActivate: [ RoleguardService ],data:{
      rol:'42',
      jefecac:'89',
      cac:'81',
      comi:'102'
     }
      },
      //////////////////////////////////////////
      /////////////////////////////////////////
      ////////RUTAS DEL PANEL DE CONTROL//////
      ///////////////////////////////////////
      //////////////////////////////////////

      /////////////////////////////////////
      ///////TABLAS///////////////////////
      ///////////////////////////////////
      { path: 'rdmodulos', component: RdmodulosComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'rdopciones', component: RdopcionesComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'rdperfiles', component: RdperfilesComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'rdusuarios', component: RdusuariosComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'rdusersopc', component: RdusersopcComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
       { path: 'userrol', component: UserrolComponent,	canActivate: [RoleguardService],data:{
         rol:'42',
        } },
        { path: 'roldomule', component: RolmoduleComponent,	canActivate: [RoleguardService],data:{
          rol:'42',
         } },
       //////////////////////////////////
      ///////NUEVOS INGRESOS////////////
      /////////////////////////////////
      { path: 'crmodulo', component: CrmoduloComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'cropciones', component: CropcionesComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'crperfiles', component: CrperfilesComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'crusuarios', component: CrusuariosComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'crusersopc', component: CrusersopcComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },


      //update
      { path: 'upmodulos', component: UpmodulosComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'upopciones', component: UpopcionesComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'upperfiles', component: UpperfilesComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'upusuarios', component: UpusuariosComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'upusuariosopciones', component: UpusuariosopcionesComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'estadousuario', component: EstadousuarioComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'usuariosdatos', component: UpdatedatosComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
       } },
      { path: 'usuariosdatosp', component: UpdatedatospComponent,	canActivate: [RoleguardService],data:{
        rol:'42',
      } },

  { path: 'fee', component: FeeComponent },
  { path: 'itemd', component: ItemDetails },
  { path: 'orderd', component: OrderComponent },
  { path: 'statc', component: StatComponent },



  //{ path: 'dpicker', component: BrowseComponentd },

  /*{
  	path: 'protegida',
  	component: ProtegidaComponent,
  	canActivate: [ AuthGuardService ]
  }, */
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
