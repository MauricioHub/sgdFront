import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

 constructor() { }

 ngOnInit() {
 }


}
