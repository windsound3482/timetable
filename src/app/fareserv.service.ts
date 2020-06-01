import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FareservService {
  fare_attributes:string[][];
  fare_rules:string[][];

  setfareAttr(fare:string[][])
  {
    this.fare_attributes=fare;
  }

  getfareAttr(){
    return this.fare_attributes;
  }

  setfareRule(fare:string[][]){
    this.fare_rules=fare;
  }

  getfareRule(){
    return this.fare_rules;
  }
  
  constructor() {
    this.setfareAttr([["fare_id","price","currency_type","payment_method","transfers"]]);
    this.setfareRule([["fare_id","date","exception_type"]]);
   }
}
