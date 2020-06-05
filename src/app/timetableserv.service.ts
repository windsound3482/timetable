import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableservService {
  trip:string[][];
  public settrip(file:string[][]){
    this.trip=file;
  }
  public gettrip(){
    return this.trip;
  }
  constructor() {
    this.trip=[["trip_id","route_id","route_id"]];
   }
}
