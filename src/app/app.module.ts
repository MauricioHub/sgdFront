import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//IMPORTACIONES DE MATERIAL ANGULAR
import {
  MatOptionModule,
  MatAutocompleteModule,
  MatFormFieldModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  
  } from '@angular/material';
  


//external modules
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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
import { PanelComponent } from './components/panel/panel.component';

import { CrmoduloComponent } from './components/create/crmodulo/crmodulo.component';
import { CropcionesComponent } from './components/create/cropciones/cropciones.component';
import { CrperfilesComponent } from './components/create/crperfiles/crperfiles.component';
import { CrusuariosComponent } from './components/create/crusuarios/crusuarios.component';
import { CrusersopcComponent } from './components/create/crusersopc/crusersopc.component';
import { RdmodulosComponent } from './components/read/rdmodulos/rdmodulos.component';
import { RdopcionesComponent } from './components/read/rdopciones/rdopciones.component';
import { RdperfilesComponent } from './components/read/rdperfiles/rdperfiles.component';
import { RdusuariosComponent } from './components/read/rdusuarios/rdusuarios.component';
import { RdusersopcComponent } from './components/read/rdusersopc/rdusersopc.component';
import { UpmodulosComponent } from './components/update/upmodulos/upmodulos.component';
import { UpopcionesComponent } from './components/update/upopciones/upopciones.component';
import { UpperfilesComponent } from './components/update/upperfiles/upperfiles.component';
import { UpusuariosComponent } from './components/update/upusuarios/upusuarios.component';
import { UpusuariosopcionesComponent } from './components/update/upusuariosopciones/upusuariosopciones.component';
import { EstadousuarioComponent } from './components/update/estadousuario/estadousuario.component';
import { UpdatedatosComponent } from './components/update/updatedatos/updatedatos.component';

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
    PanelComponent,
    CrmoduloComponent,
    CropcionesComponent,
    CrperfilesComponent,
    CrusuariosComponent,
    CrusersopcComponent,
    RdmodulosComponent,
    RdopcionesComponent,
    RdperfilesComponent,
    RdusuariosComponent,
    RdusersopcComponent,
    FooterComponent,
    UpmodulosComponent,
    UpopcionesComponent,
    UpperfilesComponent,
    UpusuariosComponent,
    UpusuariosopcionesComponent,
    EstadousuarioComponent,
    UpdatedatosComponent
    

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    APP_ROUTING,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    DataTableModule,
    DropdownModule,
    ChartsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatFormFieldModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
    
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
