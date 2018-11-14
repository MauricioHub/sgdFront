import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//external modules
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

//import * as moment from 'moment';
import { DataTable, Column, SelectItem, DataTableModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';

//routes
import { APP_ROUTING } from "./app.routes";
//import { environment } from "../environment/environment";

// services
import { HeroesService } from './services/heroes.service';
import { AuthService } from './services/auth.service';
import { DatePipe } from "@angular/common";
import { ExcelService } from './services/excel.service';


//components
import { AppComponent } from './app.component';
import { Globals } from './app.globals';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BrowseComponent } from './components/browse/browse.component';
import { BrowsebatchComponent } from './components/browse/browsebatch.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { BatchesComponent } from './components/batches/batches.component';
import { SalesComponent } from './components/sales/sales.component';
import { FeesComponent } from './components/fees/fees.component';
import { FeeComponent } from './components/fees/fee.component';
import { ItemDetails } from './components/item-details/item-details';
import { OrderComponent } from './components/order/order';
import { StatComponent } from './components/stat/stat.component';
import { Orders } from './data/orders';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { UsersdataComponent } from './components/usersdata/usersdata.component';
//import { BrowseComponentd } from './components/home/browse.component';

@NgModule({
  declarations: [
    AppComponent,    
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    BrowseComponent,
    BrowsebatchComponent,
    DataTableComponent,
    BatchesComponent,
    SalesComponent,
    FeesComponent,
    FeeComponent,
    ItemDetails,
    OrderComponent,
    StatComponent,
    ProfilesComponent,
    UsersdataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    APP_ROUTING,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    DataTableModule,
    DropdownModule,
    ChartsModule
  ],
  providers: [
    HeroesService,
    AuthService,
    DatePipe,
    ExcelService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
