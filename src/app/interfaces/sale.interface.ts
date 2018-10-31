
export class Sale{
    constructor(
        public orderId:string,
        public description:string,
        public loggedDate:string,
        public officceId:string,
        public officce:string,
        public seller:string,
        public customerId:string,
        public customer:string,
        public product:string,
        public productValue:string,
        public activationDate:string,
        public loggedUser:string,
        public status:string,
        public paymentType:string,
        public financialInstitution:string,
        public requestId:string,
        public account:string,
        public regularizedUser:string) { }
}