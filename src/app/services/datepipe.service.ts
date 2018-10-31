import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { } from 'rxjs/operators';


@Injectable()
export class DatePipeService {

    constructor(private datePipe: 
                DatePipe) {}

    transformDate(date) {
       return this.datePipe.transform(date, 'yyyy-MM-dd:HH:mm:ss');

    }
}