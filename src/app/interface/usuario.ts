export interface Usuario {
 id : string;
 username : string;
 password: string;
 firstname : string;
 lastname : string;
  email : string;
 enabled :boolean;
 lastPasswordResetDate : string;
 phonenumber:string;
authorities:number[];
}
