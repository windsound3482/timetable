import { Component, OnInit,ViewChild} from '@angular/core';
import { TimetableservService } from '../timetableserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-stop-times',
  templateUrl: './stop-times.component.html',
  styleUrls: ['./stop-times.component.css']
})
export class StopTimesComponent implements OnInit {


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
 
  
  
  onSave(){
    let elements=document.getElementsByTagName("input");
    for (var i=0;i<elements.length;i++)
    {
      if (!elements[i].checkValidity())
      {
        window.alert("Some Input goes wrong, check the red marked space!");
        return;
      }
    }
    this.file.setstoptimes(this.dataSource);
    window.alert('Your File pathways.txt has already been saved!');
    this.onReset();
  }

  onDelete()
  {
    this.dataSource.splice(this.current,1);
    this.onSave();
  }

  value_trp="XXXXXXXXXXXXXXXXXXXXX";
  setfilter(value:string) {
    this.value_trp=value;
    this.dataTable.filter=value; 
  }

  change_null_to_value(tempindex,value:string)
  {
    if (tempindex>-1)
    {
      for (var i=1;i<this.dataSource.length;i++)
      {
        if (this.dataSource[i][tempindex]=="")
        {
          this.dataSource[i][tempindex]=value;
        }
      }
    }
  }
  onReset(){
    this.displayedColumns=["stop_id","arrival_time","departure_time","stop_sequence","trip_id"];
    this.dataSource=this.file.getstoptimes();
    let name:Array<string>= (this.dataSource)[0];
    let tempname:string[]=[];
    for (let i=0;i<name.length;i++){
      if (this.names.includes(name[i]))
      {
        tempname.push(name[i]);
      }
    }
    this.nameget.setValue(tempname);
    let tempindex=this.dataSource[0].indexOf("pickup_type");
    this.change_null_to_value(tempindex,"0");
    tempindex=this.dataSource[0].indexOf("drop_off_type");
    this.change_null_to_value(tempindex,"0");
    tempindex=this.dataSource[0].indexOf("continuous_pickup");
    this.change_null_to_value(tempindex,"1");
    tempindex=this.dataSource[0].indexOf("continuous_drop_off");
    this.change_null_to_value(tempindex,"1");
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
      for (var j=0;j<5;j++)
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
        if (this.database[i][4]==this.database[j][4])
          if (parseInt(this.database[i][3])>parseInt(this.database[j][3]))
          {
            let tempstring=this.database[i].slice();
            this.database[i]=this.database[j].slice();
            this.database[j]=tempstring;
          }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
    this.dataTable.filter=this.value_trp; 
  }
  
  
  names:string[]=["stop_headsign","pickup_type","drop_off_type","continuous_pickup","continuous_drop_off","shape_dist_traveled","timepoint"];
  defaultnames:string[]=["trip_id","arrival_time","departure_time","stop_id","stop_sequence"];

  nameget = new FormControl();
  addmode=false;
  
  changecol(){
    var value=this.nameget.value;
    let add=false;
    var tempnames:string[]=this.dataSource[0].slice();
    for (var i=0;i<value.length;i++)
    {
      if (this.dataSource[0].includes(value[i])==false)
      {
        this.dataSource[0].push(value[i]);
        add=true;
        let addin="";
        if (value[i]=="pickup_type" || value[i]=="drop_off_type" || value[i]=="continuous_pickup" || value[i]=="timepoint")
          addin="0";
        for (var i=1;i<this.dataSource.length;i++)
        {
          this.dataSource[i].push(addin);
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
      let tempindex=this.dataSource[0].indexOf(tempnames[0]);
      this.dataSource[0].splice(tempindex,1);
      for (var j=1;j<this.dataSource.length;j++)
          this.dataSource[j].splice(tempindex,1);
    }
    this.changeontable();
  }
  current=null;

  
  edit(editelement:string[]){
    let database_index_stop_id=this.displayedColumns.indexOf("stop_id");
    let database_index_stop_sequence=this.displayedColumns.indexOf("stop_sequence");
    let dataSource_index_stop_id=this.dataSource[0].indexOf("stop_id");
    let dataSource_index_trip_id=this.dataSource[0].indexOf("trip_id");
    let dataSource_index_stop_sequence=this.dataSource[0].indexOf("stop_sequence");
    this.addmode=true;
    for (var i=1;i<this.dataSource.length;i++)
    {
      if (this.dataSource[i][dataSource_index_trip_id]==this.value_trp && 
          this.dataSource[i][dataSource_index_stop_id]==editelement[database_index_stop_id] &&
          this.dataSource[i][dataSource_index_stop_sequence]==editelement[database_index_stop_sequence]
        ){
        this.current=i;
        return this.current;
      }
    }
  }

  editdelete(editelement:string[]){
    this.current=this.edit(editelement);
    this.onDelete();
  }

  changestop(i,stop){
    this.dataSource[this.current][i]=stop;
  }

  addaLine(){
    for (var i=0;i<4;i++)
    {
      if (!this.tosubmitdata[i])
      {
        window.alert("Please fill in every blank");
        return;
      }
    }
    let elements=document.getElementsByTagName("input");
    for (var i=0;i<elements.length;i++)
    {
      if (!elements[i].checkValidity())
      {
        window.alert("Some Input goes wrong, check the red marked space!");
        return;
      }
    }
 
        let tempadd=Array(this.dataSource[0].length).fill("");
        let idindex=this.dataSource[0].indexOf("trip_id");
        let result=this.tosubmitdata;
        tempadd[idindex]=this.value_trp;
        idindex=this.dataSource[0].indexOf("arrival_time");
        tempadd[idindex]=result[0];
        idindex=this.dataSource[0].indexOf("departure_time");
        tempadd[idindex]=result[1];
        idindex=this.dataSource[0].indexOf("stop_id");
        tempadd[idindex]=result[2];
        idindex=this.dataSource[0].indexOf("stop_sequence");
        tempadd[idindex]=result[3];
        let exindex=this.dataSource[0].indexOf("drop_off_type");
        if (exindex>1)
          tempadd[exindex]="0";
        exindex=this.dataSource[0].indexOf("continuous_pickup");
        if (exindex>1)
          tempadd[exindex]="0";
        exindex=this.dataSource[0].indexOf("continuous_drop_off");
        if (exindex>1)
          tempadd[exindex]="0";
        exindex=this.dataSource[0].indexOf("timepoint");
        if (exindex>1)
          tempadd[exindex]="0";
        this.dataSource.push(tempadd);
        this.changeontable();
    this.checked=false;
      
   
   
    
  }
  tosubmitdata:string[]=[];
  changeaddstop(event){
    this.tosubmitdata[2]=event;
  }
  checked=false;
 
}

 



