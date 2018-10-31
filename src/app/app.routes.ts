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
import { ItemDetails } from './components/item-details/item-details';
import { OrderComponent } from './components/order/order';
import { StatComponent } from './components/stat/stat.component';

//import { BrowseComponentd } from './components/home/browse.component';
/*
//import { PreciosComponent } from "./components/precios/precios.component";
//import { ProtegidaComponent } from "./components/protegida/protegida.component";
//import { AuthGuardService } from './services/auth-guard.service'; */


const APP_ROUTES: Routes = [
//  { path: 'heroes', component: HeroesComponent },
//  { path: 'heroe/:id', component: HeroeComponent },
  { path: 'approot', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'browseBatch', component: BrowsebatchComponent },
  { path: 'datatable', component: DataTableComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'batches', component: BatchesComponent },
  { path: 'fees', component: FeesComponent },
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
