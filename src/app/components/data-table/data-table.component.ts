import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SelectItem, Dropdown } from 'primeng/primeng';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  transactions: {
    date: Date,
    label: string,
    amount: number,
    category: string
  }[];

  categories: any[];

  constructor(private _datePipeService:DatePipe) {}


  ngOnInit() {
    this.transactions = [
      {
        date: new Date(2017, 10, 10, 13, 10, 15),
        label: 'Third transaction',
        amount: 15,
        category: 'Transport'
      },
      {
        date: new Date(2017, 7, 3, 9, 35, 0),
        label: 'Second transaction',
        amount: 100,
        category: 'Bills'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 90,
        category: 'Pharmacy'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 190,
        category: 'Engineer'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 200,
        category: 'Industrial'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 210,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 220,
        category: 'Engineer'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 230,
        category: 'Engineer'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 240,
        category: 'Transport'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 250,
        category: 'Engineer'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 260,
        category: 'Bank'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 270,
        category: 'Bank'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 280,
        category: 'Medical'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 290,
        category: 'Medical'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 300,
        category: 'Chemical'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 310,
        category: 'Chemical'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 320,
        category: 'Militar'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 330,
        category: 'Militar'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 340,
        category: 'Education'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 350,
        category: 'Education'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 360,
        category: 'Education'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 370,
        category: 'Govern'
      },
      {
        date: new Date(2017, 3, 27, 15, 43, 10),
        label: 'First transaction',
        amount: 380,
        category: 'Govern'
      }
    ];
  
    this.categories = [
      { label: 'All', value: '' },
      { label: 'Bank', value: 'Bank' },
      { label: 'Bills', value: 'Bills' },
      { label: 'Chemical', value: 'Chemical' },
      { label: 'Engineer', value: 'Engineer' },
      { label: 'Govern', value: 'Govern' },
      { label: 'Militar', value: 'Militar' },
      { label: 'Medical', value: 'Medical' },
      { label: 'Education', value: 'Education' },
      { label: 'Industrial', value: 'Industrial' },
      { label: 'Pharmacy', value: 'Pharmacy' },
      { label: 'Transport', value: 'Transport' }
    ];
  }

  formatDate(date) {   
    return this._datePipeService.transform(date, 'yyyy-MM-dd');   
  }

}
