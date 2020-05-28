import { Component, OnInit ,ViewEncapsulation,ViewChild ,}from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


import { CalendarservService } from '../calendarserv.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  constructor(private file:CalendarservService,) { }
  //select date on the calendar
  
  onSave(calendar: any){
    this.file.setcalender(this.calendarData);
    this.file.setexp(this.calendarexpData);
    this.database=this.calendarData.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
    
    this.daysSelected=[];
    calendar.updateTodaysDate();
    this.value = '';
    this.dayth=[0,0,0,0,0,0,0,0,0];
    this.calen_addin=["","","","","","","","","",""];
    this.addmode=false;
    this.current=null;
    window.alert('Your Files have already been saved!');
  }

  onReset(calendar: any){
    this.calendarData=this.file.getcalender();
    this.calendarexpData=this.file.getexp();
    this.daysSelected=[];
    calendar.updateTodaysDate();
    this.value = '';
    this.dayth=[0,0,0,0,0,0,0,0,0];
    this.calen_addin=["","","","","","","","","",""];
    this.addmode=false;
    this.current=null;
  }

  daysSelected: string[] = [];
  event: any;
  isSelected = (event: any) => {
    const date:string =
      event.getFullYear() +
      ("00" + (event.getMonth()+1)).slice(-2) +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };
  
  select(event: any, calendar: any) {
    const date:string =
      event.getFullYear() +
      ("00" + (event.getMonth()+1)).slice(-2) +
      ("00" + event.getDate()).slice(-2);
      const index = this.daysSelected.findIndex(x => x == date);
      let x:string=this.calendarData[this.current][this.c_start_date];
      let y:string=this.calendarData[this.current][this.c_end_date];
      let start_year=parseInt(x.slice(0,4));
      let start_month=parseInt(x.slice(4,6));
      let start_day=parseInt(x.slice(6));
      let end_year=parseInt(y.slice(0,4));
      let end_month=parseInt(y.slice(4,6));
      let end_day=parseInt(y.slice(6));
      let datebegin:Date = new Date(start_year,start_month-1,start_day);
      let dateend:Date = new Date(end_year,end_month-1,end_day);
      
      
      let expidindex=this.calendarexpData[0].indexOf("service_id");
      let exptypeindex=this.calendarexpData[0].indexOf("exception_type");
      let expdateindex=this.calendarexpData[0].indexOf("date");
      console.log(this.dayth);
    if (index < 0) {
      
      if ((event>dateend) || (event<datebegin))
      {
        let temp:string[]=["","",""];
        temp[expidindex]=this.calendarData[this.current][this.c_ID];
        temp[exptypeindex]="1";
        temp[expdateindex]=date;
        this.calendarexpData.push(temp);
      }
      else{
        
        if (this.daya[event.getDay()]==1)
        {
          
          for (var i=1;i<this.calendarexpData.length;i++)
          {
            if ((this.calendarexpData[i][expidindex]==this.calendarData[this.current][this.c_ID]) && 
            (this.calendarexpData[i][expdateindex]==date))
            {
              this.calendarexpData.splice(i,1);
            } 
          }
        }
        else
        {
          let temp:string[]=["","",""];
          temp[expidindex]=this.calendarData[this.current][this.c_ID];
          temp[exptypeindex]="1";
          temp[expdateindex]=date;
          this.calendarexpData.push(temp);
        }
      }
      this.daysSelected.push(date);
    }
    else {
      if ((event>dateend) || (event<datebegin))
      {
        for (var i=1;i<this.calendarexpData.length;i++)
          {
            if ((this.calendarexpData[i][expidindex]==this.calendarData[this.current][this.c_ID]) && 
            (this.calendarexpData[i][expdateindex]==date))
            {
              this.calendarexpData.splice(i,1);
            } 
          }
      }
      else{
        if (this.daya[event.getDay()]==1)
        {

          let temp:string[]=["","",""];
          temp[expidindex]=this.calendarData[this.current][this.c_ID];
          temp[exptypeindex]="2";
          temp[expdateindex]=date;
          this.calendarexpData.push(temp);
          
        }
        else
        {
          for (var i=1;i<this.calendarexpData.length;i++)
          {
            if ((this.calendarexpData[i][expidindex]==this.calendarData[this.current][this.c_ID]) && 
            (this.calendarexpData[i][expdateindex]==date))
            {
              this.calendarexpData.splice(i,1);
            } 
          }
        }
      }
      this.daysSelected.splice(index, 1);
    }
    calendar.updateTodaysDate();
  }
  
  tempbegin:Date=null;
  tempend:Date=null;
  days:string[]=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  dayth:any[]=[0,0,0,0,0,0,0,0,0];
  calen_addin:string[]=["","","","","","","","","",""];

  addBegin(event: MatDatepickerInputEvent<Date>){
    this.tempbegin =
      event.value;
  }

  addEnd(event: MatDatepickerInputEvent<Date>){
    this.tempend =
      event.value;
  }

  change(calendar){
    this.daysSelected=[];
    this.calen_addin[this.c_start_date]=this.tempbegin.getFullYear() +
    ("00" + (this.tempbegin.getMonth()+1)).slice(-2) +
    ("00" + this.tempbegin.getDate()).slice(-2);

    this.calen_addin[this.c_end_date]=this.tempend.getFullYear() +
    ("00" + (this.tempend.getMonth()+1)).slice(-2) +
    ("00" + this.tempend.getDate()).slice(-2);

    this.calen_addin[this.c_Sun]=Number(this.dayth[0]).toString();
    this.calen_addin[this.c_Mon]=Number(this.dayth[1]).toString();
    this.calen_addin[this.c_Tue]=Number(this.dayth[2]).toString();
    this.calen_addin[this.c_Wed]=Number(this.dayth[3]).toString();
    this.calen_addin[this.c_Thu]=Number(this.dayth[4]).toString();
    this.calen_addin[this.c_Fri]=Number(this.dayth[5]).toString();
    this.calen_addin[this.c_Sat]=Number(this.dayth[6]).toString();
    this.calen_addin[this.c_ID]=this.value;
    this.paintOnCalend(this.tempbegin,this.tempend,this.dayth,calendar);
    if (this.current==this.calendarData.length)
    {
      this.calendarData.push(this.calen_addin);
    }
    else
    {
      this.calendarData.splice(this.current,1,this.calen_addin);
    }

    let dayava:number[]=[];
      dayava.push(parseInt(this.calendarData[this.current][this.c_Sun]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Mon]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Tue]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Wed]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Thu]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Fri]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Sat]));
      
    this.daya=dayava;

    let expidindex=this.calendarexpData[0].indexOf("service_id");
    for (var i=1;i<this.calendarexpData.length;i++)
    {
      if (this.calendarexpData[i][expidindex]==this.calendarData[this.current][this.c_ID]) 
          
      {
         this.calendarexpData.splice(i,1);
      } 
    }
    
    
  }

  paintwithexp(calendar: any){
    let expidindex=this.calendarexpData[0].indexOf("service_id");
    let exptypeindex=this.calendarexpData[0].indexOf("exception_type");
    let expdateindex=this.calendarexpData[0].indexOf("date");
    let editid=this.calendarData[this.current][this.c_ID];
    for (var i=1;i<this.calendarexpData.length;i++)
    {
      if (this.calendarexpData[i][expidindex]==editid)
      {
        let date:string=this.calendarexpData[i][expdateindex];
        if (this.calendarexpData[i][exptypeindex]=="1") 
          this.daysSelected.push(date);
        else {
          const index = this.daysSelected.findIndex(x => x == date);
          this.daysSelected.splice(index, 1);
        } 
      }
    }
    calendar.updateTodaysDate();
  }

  paintOnCalend(datenow:Data,dateend:Data,dayava:number[],calendar: any)
  {
    while (datenow<=dateend)
      {
        if (dayava[datenow.getDay()]==1)
        {
          let date:string =
            datenow.getFullYear() +
            ("00" + (datenow.getMonth() +1)).slice(-2) +
            ("00" + datenow.getDate()).slice(-2);
          this.daysSelected.push(date);
        }
        datenow.setDate(datenow.getDate() + 1);
      }
      calendar.updateTodaysDate();
  }

  daya:number[];
  edit(calendar: any){
    this.daysSelected=[];
    calendar.updateTodaysDate();
    let index=this.c_ID;
    let editable:boolean=false;
    for (var i=1;i<this.calendarData.length;i++)
    {
      if (this.value==this.calendarData[i][index])
      {
         editable=true;
         this.current=i;
         break;
      }
    }
    this.addmode=true;
    if (editable==true)
    {
      let dayava:number[]=[];
      dayava.push(parseInt(this.calendarData[this.current][this.c_Sun]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Mon]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Tue]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Wed]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Thu]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Fri]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Sat]));
      this.daya=dayava;
      let x:string=this.calendarData[this.current][this.c_start_date];
      let y:string=this.calendarData[this.current][this.c_end_date];
      let start_year=parseInt(x.slice(0,4));
      let start_month=parseInt(x.slice(4,6));
      let start_day=parseInt(x.slice(6));
      let end_year=parseInt(y.slice(0,4));
      let end_month=parseInt(y.slice(4,6));
      let end_day=parseInt(y.slice(6));
      let datenow:Date = new Date(start_year,start_month-1,start_day);
      let dateend:Date = new Date(end_year,end_month-1,end_day);
      this.paintOnCalend(datenow,dateend,dayava,calendar);
      this.paintwithexp(calendar);
    }
    else
    {
      this.current=this.calendarData.length;
    }
  }

  displayedColumns: string[]=[];
  calendarData:string[][];
  calendarexpData:string[][];
  value = '';
  
  addmode:boolean=false;
  current:number=null;
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  c_start_date:number;
  c_end_date:number;
  c_Mon:number;
  c_Tue:number;
  c_Wed:number;
  c_Thu:number;
  c_Fri:number;
  c_Sat:number;
  c_Sun:number;
  c_ID:number;
  
  ngOnInit(): void {
    this.calendarData=this.file.getcalender();
    this.calendarexpData=this.file.getexp();
    this.c_start_date=this.calendarData[0].indexOf("start_date");
    this.c_end_date=this.calendarData[0].indexOf("end_date");
    this.c_Mon=this.calendarData[0].indexOf("monday");
    this.c_Tue=this.calendarData[0].indexOf("tuesday");
    this.c_Wed=this.calendarData[0].indexOf("wednesday");
    this.c_Thu=this.calendarData[0].indexOf("thursday");
    this.c_Fri=this.calendarData[0].indexOf("friday");
    this.c_Sat=this.calendarData[0].indexOf("saturday");
    this.c_Sun=this.calendarData[0].indexOf("sunday");
    this.c_ID=this.calendarData[0].indexOf("service_id");
    let name:Array<string>= (this.calendarData)[0];
    for (let i=0;i<name.length;i++){
      this.displayedColumns.push(name[i]);
    }
    this.database=this.calendarData.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
}
