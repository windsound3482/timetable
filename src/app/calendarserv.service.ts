import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarservService {
  calendarList:string[][]=[];
  calendarexp:string[][]=[];
  mode:boolean;
  
  public setcalender(data:string[][]){
    this.calendarList=data;
    
  }
  public setexp(data:string[][]){
    this.calendarexp=data;
  }
  public getcalender(){
   
    return this.calendarList;
    
  }
  public getexp(){
    return this.calendarexp;
  }
  
  public setmode(recomm:boolean){
    this.mode=recomm;
  }

  public getmode(){
    return this.mode;
  }
  constructor() { 
    this.setcalender([["service_id","monday","tuesday","wednesday","thursday",
      "friday","saturday","sunday","start_date","end_date"]]);
    this.calendarexp=([["service_id","date","exception_type"]]);
    this.setmode(true);
  }
}
