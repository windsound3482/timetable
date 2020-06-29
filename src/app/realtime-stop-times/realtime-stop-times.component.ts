import { Component, OnInit,ViewChild} from '@angular/core';
import { TimetableservService } from '../timetableserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Output,EventEmitter} from '@angular/core'

@Component({
  selector: 'app-realtime-stop-times',
  templateUrl: './realtime-stop-times.component.html',
  styleUrls: ['./realtime-stop-times.component.css']
})
export class RealtimeStopTimesComponent implements OnInit {
  @Output() info= new EventEmitter();
  constructor(
    private file: TimetableservService,
  ) { }
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

  ngOnInit(): void {
    this.onReset();
  }


  value_trp="XXXXXXXXXXXXXXXXXXXXX";
  setfilter(value:string) {
    this.value_trp=value;
    this.dataTable.filter=value; 
  }

 
  onReset(){
    this.displayedColumns=["stop_id","stop_sequence","trip_id"];
    this.dataSource=this.file.getstoptimes().slice();
   
    this.value_trp=="XXXXXXXXXXXXXXXXXXXXX";
    this.changeontable();
    this.addmode=false;
    this.current=null;
   
  }

  changeontable()
  {
    this.database=[];
    let listname=this.dataSource[0];
    for (var i=1;i<this.dataSource.length;i++)
    {
      let tempinput=[];
      for (var j=0;j<3;j++)
      {
        if (listname.includes(this.displayedColumns[j]))
          tempinput.push(this.dataSource[i][listname.indexOf(this.displayedColumns[j])]);
        else 
          tempinput.push("");
      }
      this.database.push(tempinput);
    }
    //sort the database
    for (var i=1;i<this.database.length;i++)
      for (var j=this.database.length-1;j>i;j--)
        if (this.database[i][2]==this.database[j][2])
          if (parseInt(this.database[i][1])>parseInt(this.database[j][1]))
          {
            let tempstring=this.database[i].slice();
            this.database[i]=this.database[j].slice();
            this.database[j]=tempstring;
          }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
    this.dataTable.filter=this.value_trp; 
  }
  
  
  addmode=false;
  
  current=null;

  
  edit(editelement:string[]){
    this.info.emit(editelement);
  }
}
