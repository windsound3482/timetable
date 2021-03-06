import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableservService {
  trip:string[][];
  freq:string[][];
  route:string[][];
  stoptimes:string[][];

  
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

  public setroute(file:string[][]){
    this.route=file;
  }
  public getroute(){
    return this.route;
  }

  public setstoptimes(file:string[][]){
    this.stoptimes=file;
  }
  public getstoptimes(){
    return this.stoptimes;
  }
  constructor() {
    this.trip=[["trip_id","route_id","service_id"]];
    this.freq=[["trip_id","start_time","end_time","headway_secs","exact_times"]];
    this.route=[["route_id","route_type","route_short_name"]];
    this.stoptimes=[["trip_id","arrival_time","departure_time","stop_id","stop_sequence"]];
   }
}
