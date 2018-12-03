import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {ServicesgetService} from "../../servicios/serget/servicesget.service";
import { NgForm,FormControl,Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableDataSource,MatPaginator,MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {MatTableModule} from '@angular/material';
import {Opcion} from "../../interface/opcion";
import {DataSource} from '@angular/cdk/collections';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Observable} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Globals } from '../../app.globals';

@Component({
  selector: 'app-controlador',
  templateUrl: './controlador.component.html',
  styleUrls: ['./controlador.component.css'],
  animations: [
   trigger('detailExpand', [
     state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
     state('expanded', style({height: '*'})),
     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
   ]),
 ],
})
export class ControladorComponent implements OnInit {
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
public opciones = new MatTableDataSource();
  constructor(private srdopciones:ServicesgetService, public dialog:MatDialog,private disableRt:Globals ) {
    this.litstaidopcup();
    if(localStorage.getItem('disableRoot') == 'true')
      this.disableRt.disableRoot = true;
    }

  ngOnInit() {
  }
  litstaidopcup(){
    this.srdopciones.getOpciones('','','','').subscribe((opciones:any)=>{
    console.log(opciones);
    this.opciones.data=opciones.options;

    },
    err=>console.log(err))
  }
}
