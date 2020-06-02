import { Component, OnInit,ViewChild} from '@angular/core';
import { FareservService } from '../fareserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-farerule',
  templateUrl: './farerule.component.html',
  styleUrls: ['./farerule.component.css']
})
export class FareruleComponent implements OnInit {

  constructor(
    private file:FareservService,
  ) { }
  displayedColumns: string[]=[];
  dataSource :string[][];
  
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.onReset();
  }
 
  
  
  onSave(){
    let route_idindex=this.displayedColumns.indexOf("route_id");
    let origin_idindex=this.displayedColumns.indexOf("origin_id");
    let destination_idindex=this.displayedColumns.indexOf("destination_id");
    let contains_idindex=this.displayedColumns.indexOf("contains_id");
    let idindex=this.displayedColumns.indexOf("fare_id");
    let tempinput:string[]=Array(this.displayedColumns.length).fill("");
    tempinput[idindex]=this.value;
    if (route_idindex>-1)
      tempinput[route_idindex]=this.route_id;
    if (origin_idindex>-1)
      tempinput[origin_idindex]=this.origin_id;
    if (destination_idindex>-1) 
      tempinput[destination_idindex]=this.destination_id;
    if (contains_idindex>-1) 
      tempinput[contains_idindex]=this.contains_id;
    console.log(tempinput);
    if (this.current==this.dataSource.length)
    {
      this.dataSource.push(tempinput);
    }
    else
    {
      this.dataSource.splice(this.current,1,tempinput);
    }
    
    this.file.setfareRule(this.dataSource);
    window.alert('Your File fare_attributes.txt has already been saved!');
    this.onReset();
  }
  
  onDelete(){
    this.dataSource.splice(this.current,1);
    this.file.setfareAttr(this.dataSource);
    window.alert('Your File fare_attributes.txt has already been saved!');
    this.onReset();
  }
  onReset(){
    this.displayedColumns=[];
    this.dataSource=this.file.getfareRule();
    let name:Array<string>= (this.dataSource)[0];
    let tempname:string[]=[];
    for (let i=0;i<name.length;i++){
      this.displayedColumns.push(name[i]);
      if (this.names.includes(name[i]))
      {
        tempname.push(name[i]);
      }
    }
    
    this.nameget.setValue(tempname);
   
    this.database=this.dataSource.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;

    this.value="";
    this.route_id="";
    this.origin_id="";
    this.destination_id="";
    this.contains_id="";
    this.addmode=false;
    this.deletemode=false;
  }
  
  
  names:string[]=["route_id","origin_id","destination_id","contains_id"];
  defaultnames:string[]=["fare_id"];

  nameget = new FormControl();
  
  
  addmode=false;
  deletemode=false;
  
  edit(){
    let datarule:string[][]=this.file.getfareAttr();
    let index=datarule[0].indexOf("fare_id");
    let flag=true;
    for (var i=1;i<datarule.length;i++)
    {
      if (datarule[i][index]==this.value)
      {
        flag=false;
        break;
      }
    }
    if (flag==true)
    {
      window.alert("You want to edit a fare-rule of a fare-id which is not declared in fare_attribute.txt!!!");
      return;
    }
    this.addmode=true;
    let idindex=this.displayedColumns.indexOf("fare_id");
    this.current=this.dataSource.length;
    for (var i=1;i<this.dataSource.length;i++)
    {
       if (this.dataSource[i][idindex]==this.value)
       {
        this.current=i;
        break;
       }
    }
    if (this.current<this.dataSource.length)
    {
      if (this.displayedColumns.indexOf("route_id")>-1)
        this.route_id=this.dataSource[this.current][this.displayedColumns.indexOf("route_id")];
      if (this.displayedColumns.indexOf("origin_id")>-1)
        this.origin_id=this.dataSource[this.current][this.displayedColumns.indexOf("origin_id")];
      if (this.displayedColumns.indexOf("destination_id")>-1)
        this.destination_id=this.dataSource[this.current][this.displayedColumns.indexOf("destination_id")];
      if (this.displayedColumns.indexOf("contains_id")>-1)
        this.contains_id=this.dataSource[this.current][this.displayedColumns.indexOf("contains_id")];
      this.deletemode=true;
    }
  }
  
  current:number;

  value="";
  
  route_id_req:boolean=false;
  route_id="";

  origin_id_req:boolean=false;
  origin_id="";
  
  
  destination_id:string="";
  destination_id_req:boolean=false;

  contains_id:string="";
  contains_id_req:boolean=false;
  changecol(){
    var value=this.nameget.value;
    let add=false;
    var tempnames:string[]=this.displayedColumns.slice();
    for (var i=0;i<value.length;i++)
    {
      if (this.displayedColumns.includes(value[i])==false)
      {
        this.displayedColumns.push(value[i]);
        this.dataSource.splice(0,1,this.displayedColumns);
        add=true;
        if (value[i]=="route_id")
        {
          this.route_id_req=true;
        }
        if (value[i]=="origin_id")
        {
          this.origin_id_req=true;
        }
        if (value[i]=="destination_id")
        {
          this.destination_id_req=true;
        }
        if (value[i]=="contains_id")
        {
          this.contains_id_req=true;
        }
        
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
      
        if (tempnames[0]=="route_id")
        {
          this.route_id_req=false;
        }
        if (tempnames[0]=="origin_id")
        {
          this.origin_id_req=false;
        }
        if (tempnames[0]=="destination_id")
        {
          this.destination_id_req=false;
        }
        if (tempnames[0]=="contains_id")
        {
          this.contains_id_req=false;
        }
        
      let tempindex=this.displayedColumns.indexOf(tempnames[0]);
      this.displayedColumns.splice(tempindex,1);
      this.dataSource.splice(0,1,this.displayedColumns);
      for (var j=1;j<this.dataSource.length;j++)
          this.dataSource[j].splice(tempindex,1);
    }
    this.database=this.dataSource.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
  
}
