import { Component, OnInit,ViewChild,Input} from '@angular/core';
import { StopservService } from '../stopserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-stop-picker',
  templateUrl: './stop-picker.component.html',
  styleUrls: ['./stop-picker.component.css'],
  providers: []

})
export class StopPickerComponent implements OnInit {
  @Input() stopnow:string;
  @Output() notify= new EventEmitter();
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  editchild(input:string){
      this.currentparent=input;
        
      this.getstation(this.currentparent);
  }
  editparent(){
    let idindex=this.dataSource[0].indexOf("stop_id");
    for (var i=1;i<this.dataSource.length;i++)
    {
      if (this.dataSource[i][idindex]==this.currentparent)
      {
        this.currentparent=this.dataSource[i][this.dataSource[0].indexOf("parent_station")];
        this.getstation(this.currentparent);
        break;
      }
    }
  }

  getstation(parentstation){

    let index=[];
    for (var i=0;i<5;i++)
    {
      index.push(this.dataSource[0].indexOf(this.displayedColumns[i]));
    }
    this.database=[];
    let parentindex=this.dataSource[0].indexOf("parent_station");
    
      for (var i=1;i<this.dataSource.length;i++)
      {
        if (this.dataSource[i][parentindex]==parentstation)
        {
          let tempinput=new Array(5).fill("");
          for (var j=0;j<5;j++)
            if (index[j]>-1){
                tempinput[j]=this.dataSource[i][index[j]];
            }
          this.database.push(tempinput);
        }
      }
      this.dataTable=new MatTableDataSource<string[]>(this.database);
      this.dataTable.paginator = this.paginator;
  }
  constructor(
    private stops:StopservService, 
  ) { }

  ngOnInit(): void {
    this.displayedColumns=["stop_id","stop_name","location_type","parent_station","platform_code"];
    this.dataSource=this.stops.getstop();
    var i:string;
    console.log(this.dataSource);
      if (!this.dataSource[0].includes("parent_station"))
      {
        this.dataSource[0].push("parent_station");
        for (var j=1;j<this.dataSource.length;j++)
          this.dataSource[j].push("");
      }

      if (!this.dataSource[0].includes("platform_code"))
      {
        this.dataSource[0].push("platform_code");
        for (var j=1;j<this.dataSource.length;j++)
          this.dataSource[j].push("");
      }

    if (!this.dataSource[0].includes("location_type"))
    {
      console.log('ja');
      this.dataSource[0].push("location_type");
      for (var j=1;j<this.dataSource.length;j++)
        this.dataSource[j].push("0");
    }
    else
    {
      console.log("nein");
      let index=this.dataSource[0].indexOf("location_type");
      console.log(index);
      for (var j=1;j<this.dataSource.length;j++)
        if (this.dataSource[j][index]=="")
        {
          console.log("now");
          this.dataSource[j][index]="0";
        }
    }

    this.getstation("");
    this.currentparent="";
    this.add_stop_input(this.stopnow);
  } 
  currentparent="";
  currentstop="";
  add_stop_input(input:string){
    this.notify.emit(input);
    this.currentstop="";
    let idindex=this.dataSource[0].indexOf("stop_id");
    for (var i=1;i<this.dataSource.length;i++)
    {
      if (this.dataSource[i][idindex]==input)
      {
        let nameindex=this.dataSource[0].indexOf("stop_name");
   
        let platformindex=this.dataSource[0].indexOf("platform_code");
        this.currentstop=this.dataSource[i][idindex].concat(" ",this.dataSource[i][nameindex]," ",this.dataSource[i][platformindex]);
        break;
      }
    }
  }
    
}


