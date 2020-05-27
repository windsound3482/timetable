import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarservService {
  calendarList:string[][]=[];
  calendarexp:string[][]=[];
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
  
  constructor() { }
}
