import { Component, OnInit ,ViewEncapsulation,ViewChild ,}from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AltercalenComponent } from '../altercalen/altercalen.component';
import { CalendarservService } from '../calendarserv.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  constructor(private file:CalendarservService,) { 

  }

  @ViewChild(AltercalenComponent ) altercalen: AltercalenComponent ;
  //select date on the calendar
  
  onSave(calendar: any,begininput,endinput){
    this.file.setcalender(this.calendarData);
    this.file.setexp(this.calendarexpData);
    this.database=this.calendarData.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
    this.daysSelected=[];
    
    this.value_cal = '';
    this.dayth=[0,0,0,0,0,0,0,0,0];
    this.calen_addin=["","","","","","","","","",""];
    this.addmode=false;
    this.current=null;
    begininput.value_cal="";
    endinput.value_cal="";
    calendar.updateTodaysDate();
    window.alert('Your Files have already been saved!');
  }

  onReset(calendar: any,begininput,endinput){
    this.ngOnInit();
    calendar.updateTodaysDate();
    begininput.value_cal="";
    endinput.value_cal="";
  }

  daysSelected: string[] = [];
  event: any;
  isSelected = (event: any) => {
    if (this.value_cal=="") return null;
    const date:string =
      event.getFullYear() +
      ("00" + (event.getMonth()+1)).slice(-2) +
      ("00" + event.getDate()).slice(-2);
    let flag=false;
    let databegin=this.getDatabeginend()[0];
      let dataend=this.getDatabeginend()[1];
    if ((this.daya[event.getDay()]==1)&& (databegin<=event) && (dataend>=event))
      flag=true;
    if (this.daysSelected.find(x => x == date))
    {
      if (flag==true)
        return "selected";
      else
        return "exp1";
    }
    else
    {
      if (flag==true && (databegin<=event) && (dataend>=event))
        return "exp2";
    }
    return null;
  };

  getDatabeginend(){
    if (!this.current)
    { return [null,null];}
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
    return [datebegin,dateend];
  }

  select(event: any, calendar: any) {
    if ((!this.addmode) || (!this.mode))
    {
      return;
    }
    const date:string =
      event.getFullYear() +
      ("00" + (event.getMonth()+1)).slice(-2) +
      ("00" + event.getDate()).slice(-2);
      const index = this.daysSelected.findIndex(x => x == date);
      
      let datebegin=this.getDatabeginend()[0];
      let dateend=this.getDatabeginend()[1];
      
      let expidindex=this.calendarexpData[0].indexOf("service_id");
      let exptypeindex=this.calendarexpData[0].indexOf("exception_type");
      let expdateindex=this.calendarexpData[0].indexOf("date");
      console.log(this.dayth);
    if (index < 0) {
      
      if ((event>dateend) || (event<datebegin))
      {
        let temp:string[]=["","",""];
        temp[expidindex]=this.value_cal;
        temp[exptypeindex]="1";
        temp[expdateindex]=date;
        this.calendarexpData.push(temp);
      }
      else{
        
        if (this.daya[event.getDay()]==1)
        {
          
          for (var i=1;i<this.calendarexpData.length;i++)
          {
            if ((this.calendarexpData[i][expidindex]==this.value_cal) && 
            (this.calendarexpData[i][expdateindex]==date))
            {
              this.calendarexpData.splice(i,1);
              break;
            } 
          }
        }
        else
        {
          let temp:string[]=["","",""];
          temp[expidindex]=this.value_cal;
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
            if ((this.calendarexpData[i][expidindex]==this.value_cal) && 
            (this.calendarexpData[i][expdateindex]==date))
            {
              this.calendarexpData.splice(i,1);
              break;
            } 
          }
      }
      else{
        if (this.daya[event.getDay()]==1)
        {

          let temp:string[]=["","",""];
          temp[expidindex]=this.value_cal;
          temp[exptypeindex]="2";
          temp[expdateindex]=date;
          this.calendarexpData.push(temp);
          
        }
        else
        {
          for (var i=1;i<this.calendarexpData.length;i++)
          {
            if ((this.calendarexpData[i][expidindex]==this.value_cal) && 
            (this.calendarexpData[i][expdateindex]==date))
            {
              this.calendarexpData.splice(i,1);
              break;
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
  currentmonth:Date=new Date();

  addBegin(event: MatDatepickerInputEvent<Date>){
    this.tempbegin =
      event.value;
  }

  addEnd(event: MatDatepickerInputEvent<Date>){
    this.tempend =
      event.value;
  }

  
  getdaya(){
    let dayava:number[]=[];
      dayava.push(parseInt(this.calendarData[this.current][this.c_Sun]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Mon]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Tue]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Wed]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Thu]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Fri]));
      dayava.push(parseInt(this.calendarData[this.current][this.c_Sat]));
    return dayava;
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
    this.calen_addin[this.c_ID]=this.value_cal;
    
    if (this.current==this.calendarData.length)
    {
      this.calendarData.push(this.calen_addin);
    }
    else
    {
      this.calendarData.splice(this.current,1,this.calen_addin);
    }
    this.daya=this.getdaya();
    let tempb=new Date(this.tempbegin);
    let tempe=new Date(this.tempend);
    this.paintOnCalend(tempb,tempe,this.dayth,calendar);
    console.log(this.daya);

    let expidindex=this.calendarexpData[0].indexOf("service_id");
    let expatde:string[][]=this.calendarexpData.slice();
    for (var i=this.calendarexpData.length - 1 ;i>=1;i--)
    {
      if (this.calendarexpData[i][expidindex]==this.value_cal) 
          
      {
         expatde.splice(i,1);
      } 
    }
    this.calendarexpData=expatde;
  }
  
  onDelete(calendar,begininput,endinput){
    this.calendarData.splice(this.current,1);
    let expidindex=this.calendarexpData[0].indexOf("service_id");
    let expatde:string[][]=this.calendarexpData.slice();
    for (var i=this.calendarexpData.length - 1 ;i>=1;i--)
    {
      if (this.calendarexpData[i][expidindex]==this.value_cal) 
      {
         expatde.splice(i,1);
      } 
    }
    this.value_cal="";
    this.calendarexpData=expatde;
    this.onSave(calendar,begininput,endinput);
  }

  paintwithexp(calendar: any){
    let expidindex=this.calendarexpData[0].indexOf("service_id");
    let exptypeindex=this.calendarexpData[0].indexOf("exception_type");
    let expdateindex=this.calendarexpData[0].indexOf("date");
    let editid=this.value_cal;
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

  paintOnCalend(datenow:Date,dateend:Date,dayava:number[],calendar: any)
  {
   
    calendar._goToDateInView(new Date(datenow),'month');
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

  daya:number[]=new Array(7).fill(0);
  edit(calendar: any){
    this.daysSelected=[];
    calendar.updateTodaysDate();
    let index=this.c_ID;
    let editable:boolean=false;
    for (var i=1;i<this.calendarData.length;i++)
    {
      if (this.value_cal==this.calendarData[i][index])
      {
         editable=true;
         this.current=i;
         break;
      }
    }
    this.addmode=true;
    if (editable==true)
    {
      this.daya=this.getdaya();
      let datenow:Date = this.getDatabeginend()[0];
      let dateend:Date = this.getDatabeginend()[1];
      this.paintOnCalend(datenow,dateend,this.daya,calendar);
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
  value_cal = '';
  
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
  mode:boolean;
  ngOnInit(): void {
    this.mode=this.file.getmode();
    this.calendarData=this.file.getcalender();
    this.calendarexpData=this.file.getexp();
    this.daysSelected=[];
    this.displayedColumns=[];
    let name:Array<string>= (this.calendarData)[0];
    if (this.mode)
    {
      
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
      
    }
    for (let i=0;i<name.length;i++){
      this.displayedColumns.push(name[i]);
    }

    this.database=this.calendarData.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;

    this.value_cal = '';
    this.dayth=[0,0,0,0,0,0,0,0,0];
    this.calen_addin=["","","","","","","","","",""];
    this.addmode=false;
    this.current=null;

  }

  add_service_input(name:string){
    this.value_cal=name;
  }

  changemode(){
    this.mode=this.file.getmode();
    this.altercalen.ngOnInit();
    this.ngOnInit();
  }
}
