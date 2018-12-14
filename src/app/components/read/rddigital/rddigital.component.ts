import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {ResponseModule} from "../../../interface/response-module";
import {Trazabilidad} from"../../../interface/Trazabilidad";
import {MatTableModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import { Globals } from '../../../app.globals';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-rddigital',
  templateUrl: './rddigital.component.html',
  styleUrls: ['./rddigital.component.css']
})
export class RddigitalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
