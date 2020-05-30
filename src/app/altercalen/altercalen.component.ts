import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { CalendarservService } from '../calendarserv.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-altercalen',
  templateUrl: './altercalen.component.html',
  styleUrls: ['./altercalen.component.css']
})
export class AltercalenComponent implements OnInit{
  @Input() inevent: boolean;
  onSave(calendar: any){
    this.file.setexp(this.calendarexpData);
    this.database=this.calendarexpData.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
    
    this.daysSelected=[];
    calendar.updateTodaysDate();
    this.value = '';
    this.addmode=false;
    window.alert('Your Files have already been saved!');
  }

  onReset(calendar: any){
    this.calendarexpData=this.file.getexp();
    this.daysSelected=[];
    calendar.updateTodaysDate();
    this.value = '';
    this.addmode=false;
   
  }

  onDelete(calendar){
    
    let expidindex=this.calendarexpData[0].indexOf("service_id");
    let expatde:string[][]=this.calendarexpData.slice();
    for (var i=this.calendarexpData.length - 1 ;i>=1;i--)
    {
      if (this.calendarexpData[i][expidindex]==this.value) 
          
      {
         expatde.splice(i,1);
      } 
    }
    this.calendarexpData=expatde;
    this.onSave(calendar);
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
    if (this.addmode==false)
      return;
    const date:string =
      event.getFullYear() +
      ("00" + (event.getMonth()+1)).slice(-2) +
      ("00" + event.getDate()).slice(-2);
      const index = this.daysSelected.findIndex(x => x == date);
      let expidindex=this.calendarexpData[0].indexOf("service_id");
      let exptypeindex=this.calendarexpData[0].indexOf("exception_type");
      let expdateindex=this.calendarexpData[0].indexOf("date");
    if (index < 0) {
      let temp:string[]=["","",""];
      temp[expidindex]=this.value;
      temp[exptypeindex]="1";
      temp[expdateindex]=date;
      this.calendarexpData.push(temp);
        
      this.daysSelected.push(date);
    }
    else {
      
      for (var i=1;i<this.calendarexpData.length;i++)
         
      if ((this.calendarexpData[i][expidindex]==this.value) && 
        (this.calendarexpData[i][expdateindex]==date))
           
          this.calendarexpData.splice(i,1);
            
      this.daysSelected.splice(index, 1);
    }
    calendar.updateTodaysDate();
  }

  edit(calendar)
  {
    this.addmode=true;
    let expidindex=this.calendarexpData[0].indexOf("service_id");
    let expdateindex=this.calendarexpData[0].indexOf("date");
    let editid=this.value;
    for (var i=1;i<this.calendarexpData.length;i++)
    {
      if (this.calendarexpData[i][expidindex]==editid)
      {
        let date:string=this.calendarexpData[i][expdateindex];
        
        this.daysSelected.push(date);
      }
    }
    calendar.updateTodaysDate();
  }
  
  constructor(
    private file:CalendarservService,
  ) {
   }
  calendarexpData:string[][];
  displayedColumns: string[]=[];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  value="";
  addmode:boolean=false;
  mode:boolean;
  ngOnInit(): void {
    this.mode=this.file.getmode();
    this.calendarexpData=this.file.getexp();
    this.displayedColumns=[];
    let name:Array<string>= (this.calendarexpData)[0];
    for (let i=0;i<name.length;i++){
      this.displayedColumns.push(name[i]);
    }
    this.database=this.calendarexpData.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
  

}
