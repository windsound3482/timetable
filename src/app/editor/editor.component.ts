import { Component, OnInit,ViewChild} from '@angular/core';
import { TimetableservService } from '../timetableserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ZipService } from '../zip.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { FreqComponent } from '../freq/freq.component';
import { RouteComponent } from '../route/route.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild(CalendarComponent) calencom:CalendarComponent ;
  @ViewChild(FreqComponent) freqcom:FreqComponent;
  @ViewChild(RouteComponent) routecom:RouteComponent;
  constructor(
    private file:TimetableservService,
    private zip: ZipService,
  ) { }
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  value="";
  editable=false;
  value_cal="";
  value_rou="";
  current=null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  
  edittrip(){
    this.editable=true;
    this.current=this.database.length+1;
    for (var i=0;i<this.database.length;i++)
    {
        if (this.database[i][0]==this.value){
          //set install value for the other tables.
          //database does not have displaycol
          this.value_cal=this.database[i][2];
          this.value_rou=this.database[i][1];
          this.current=i+1;
          break;
        }
    }
    if (this.current==(this.database.length+1))
    {
      let tempint=Array(this.dataSource[0].length).fill("");
      tempint[this.dataSource[0].indexOf("trip_id")]=this.value;
      this.dataSource.push(tempint);
    }
    this.calencom.value_cal=this.value_cal;
    this.routecom.value_rou=this.value_rou;
    this.freqcom.setfilter(this.value);
  }

  ngOnInit(): void {
    
    this.displayedColumns=["trip_id","route_id","service_id"];
    this.dataSource=this.file.gettrip();
    
    let name:Array<string>= (this.dataSource)[0];
    let tempname:string[]=[];
    for (let i=0;i<name.length;i++){
      if (this.names.includes(name[i]))
      {
        tempname.push(name[i]);
      }
    }
    this.nameget.setValue(tempname);

    let trip_index=this.dataSource[0].indexOf("trip_id");
    let route_index=this.dataSource[0].indexOf("route_id");
    let service_index=this.dataSource[0].indexOf("service_id");
    this.database=[];
    let chairindex=this.dataSource[0].indexOf("wheelchair_accessible");
    let bikeindex=this.dataSource[0].indexOf("bikes_allowed");

    if (chairindex>-1)
    {
      for (var i=1;i<this.dataSource.length;i++)
      {
        if (this.dataSource[i][chairindex]=="")
        {
          this.dataSource[i][chairindex]="0";
        }
      }
    }

    if (bikeindex>-1)
    {
      for (var i=1;i<this.dataSource.length;i++)
      {
        if (this.dataSource[i][bikeindex]=="")
        {
          this.dataSource[i][bikeindex]="0";
        }
      }
    }
    for (var i=1;i<this.dataSource.length;i++)
    {
      let tempinput=[];
      tempinput.push(this.dataSource[i][trip_index]);
      tempinput.push(this.dataSource[i][route_index]);
      tempinput.push(this.dataSource[i][service_index]);
      this.database.push(tempinput);
    }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;

    this.editable=false;
    this.value="";
    this.value_cal="";
    this.value_rou="";
  }


  names:string[]=["trip_headsign","trip_short_name","direction_id","block_id","shape_id","wheelchair_accessible","bikes_allowed"];
  defaultnames:string[]=["route_id","service_id","trip_id"];
  nameget = new FormControl();
  onSave(stepper:any){
    this.file.settrip(this.dataSource);
    this.freqcom.onSave();
    window.alert('Your Files have already been saved!');
    this.onReset(stepper);
    
  }
  
  onDelete(stepper:any){
    this.dataSource.splice(this.current,1);
    this.file.settrip(this.dataSource);
    this.freqcom.onDelete();
    this.onReset(stepper);
    
  }
  

  onReset(stepper:any){
    stepper.reset();
    this.calencom.ngOnInit();
    this.routecom.ngOnInit();
    this.freqcom.ngOnInit();
    this.ngOnInit();
  }
  
  add_trip_input(name:string){
    this.value=name;
  }
  
  oncal_Notify(event){
    this.value_cal=event;
    this.dataSource[this.current][this.dataSource[0].indexOf("service_id")]=this.value_cal;
  }

  onrou_Notify(event){
    this.value_rou=event;
    this.dataSource[this.current][this.dataSource[0].indexOf("route_id")]=this.value_rou;
  }

  download(){
    this.zip.downloadFile();
  }
  
  changecol(){
    var value=this.nameget.value;
    let add=false;
    var tempnames:string[]=this.dataSource[0].slice();
    for (var i=0;i<value.length;i++)
    {
      if (this.dataSource[0].includes(value[i])==false)
      {
        this.dataSource[0].push(value[i]);
        if (value[i]=="direction_id" || value[i]=="wheelchair_accessible" || value[i]=="bikes_allowed")
          for (var j=1;j<this.dataSource.length;j++)
            this.dataSource[j].push("0");
        else
          for (var j=1;j<this.dataSource.length;j++)
            this.dataSource[j].push("");
        add=true;
        break;
      }
      else{
        let tempin=tempnames.indexOf(value[i]);
        tempnames.splice(tempin,1);
      }
    } 
    if (add==false){
      for (var i=0;i<this.defaultnames.length;i++)
      {
        tempnames.splice(tempnames.indexOf(this.defaultnames[i]),1);
      }
      let tempindex=this.dataSource[0].indexOf(tempnames[0]);
      for (var j=0;j<this.dataSource.length;j++)
          this.dataSource[j].splice(tempindex,1);
    }
  }
}
