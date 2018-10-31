import {Component, ChangeDetectorRef} from '@angular/core';
import {Orders} from '../../data/orders';
import {ItemDetails} from '../item-details/item-details';

@Component({
  selector: 'order',
  templateUrl: './order.html'
})
export class OrderComponent {
    order: any;
    itemSelected: any;

    constructor(private cdRef:ChangeDetectorRef){
        this.order = Orders[0];
    }
    
    onItemSelect(item){
      this.itemSelected=item;
    }
    
    processNextOrCompleteOrder = () => {

      let pendingItems = this.order.items.filter((item) => item.status === 'Not Processed' );
      // get next item in the order
      if (pendingItems.length > 0) {
        this.itemSelected = pendingItems[0];
        this.cdRef.detectChanges();
        
      } else {
        this.itemSelected = null;
        this.cdRef.detectChanges();
        this.completeOrder();
      } 
    }
    
    processOrderItems = () => {
      this.itemSelected.status = "Processed";
      this.processNextOrCompleteOrder();
    }
    
    completeOrder = () => this.order.status = "Processed";
}