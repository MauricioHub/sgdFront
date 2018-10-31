
export class Batch{
    constructor(
        public orderId:string,
        public status:string,
        public reason:string,
        public indexOld:number,
        public observation:string,
        public lotId:string){}
}