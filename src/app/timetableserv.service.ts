import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableservService {
  trip:string[][];
  freq:string[][];

  
  public settrip(file:string[][]){
    this.trip=file;
  }
  public gettrip(){
    return this.trip;
  }

  public setfreq(file:string[][]){
    this.freq=file;
  }
  public getfreq(){
    return this.freq;
  }
  constructor() {
    this.trip=[["trip_id","route_id","route_id"]];
    this.freq=[["trip_id","start_time","end_time","headway_secs","exact_times"]];
   }
}
