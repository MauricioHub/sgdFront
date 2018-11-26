
export class Sale{
    constructor(
        public orderId:string,                
        public officceId:string,
        public officce:string,        
        public customerId:string,
        public customer:string,
        public product:string,                        
        public activationDate:string,
        public loggedUser:string,        
        public status:string,
        public paymentType:string,
        public financialInstitution:string
    ) { }
}