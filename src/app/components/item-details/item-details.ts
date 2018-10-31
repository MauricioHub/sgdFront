import {Component,Input, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import {Orders} from '../../data/orders';

@Component({
  selector: 'item-details',
  templateUrl: './item-details.html'
})
export class ItemDetails implements OnChanges {
  
  private _item;
  get item(): any {
    return this._item;
  }
  
  @Input()
  set item(val: any) {
    console.log('previous item = ', this._item);
    console.log('currently selected item=', val);
    this._item = val;
    this._item.status = 'In Process';
  }
  
  @Input() notifyItemProcessed: () => void;
  
  
  suppliedQuantity: number;
  scannedUPC: string;
  errors: string[];
  
  constructor(){
    this.suppliedQuantity = 0;
    this.scannedUPC = '';

    this._item = Orders[0];
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('inside ngOnChanges', changes);
    const currentItem: SimpleChange = changes.item;
    console.log('prev value: ', currentItem.previousValue);
    console.log('got item: ', currentItem.currentValue);
    if(currentItem.currentValue){
      this.scannedUPC = changes.item.currentValue.upc;
    }
    this.suppliedQuantity = 0;
    
  }
  
  processItem = () => {
    this.errors = [];
    if(this.suppliedQuantity < 1){
     this.errors.push('Supplied quantity cannot be less than 0');
    } 
   
    if(this.suppliedQuantity > this.item.quantity){
     this.errors.push('Supplied quantity cannot be more than ordered qunatity');
    }  
   
    if(this.scannedUPC != this.item.upc){
     this.errors.push('ScannedUPC not matching with product UPC');
    }  
   
    if (this.errors.length > 0){
     return false;
    }
    
    if (!this.item.quantityInCart){
     this.item['quantityInCart'] = this.suppliedQuantity;
    }
    this.suppliedQuantity = 0;
    this.scannedUPC = '';
    this.notifyItemProcessed();

  }
}
