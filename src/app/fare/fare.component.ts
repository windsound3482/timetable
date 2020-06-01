import { Component, OnInit,ViewChild} from '@angular/core';
import { FareservService } from '../fareserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.css']
})
export class FareComponent implements OnInit {
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
    this.dataSource=[];
    this.dataSource.push(this.displayedColumns);
    this.database=this.dataTable.data;
    let mussthing:number[]=[];
    for (var i=0;i<this.defaultnames.length;i++)
    {
      mussthing.push(this.displayedColumns.indexOf(this.defaultnames[i]));
    }
    let copydatabase=this.database.slice();
    let tempindex=this.displayedColumns.length;
    for (var i=this.database.length -1;i>=0;i--)
    {
      let deleteeable=true;
      for (var j=tempindex-1;j>=0;j--)
      if (this.database[i][j]!="" && this.database[i][j]!=null)
      {
        deleteeable=false;
      }
      if (deleteeable==true)
      {
        copydatabase.splice(i,1);
      }
      else
      {
        for (var j=0;j<mussthing.length;j++)
        {
          if (this.database[i][mussthing[j]]=="" || this.database[i][mussthing[j]]==null)
          {
            let message:string="datatable need a value at [";
            message=message.concat(i.toString(),",",mussthing[j].toString(),"] ,for ",(this.displayedColumns[mussthing[j]]).toString());
            window.alert(message);
            return;
          }
        }
      }
    }
    this.dataSource=this.dataSource.concat(copydatabase);
    
    this.file.setfareAttr(this.dataSource);
    window.alert('Your File agency.txt has already been saved!');
    this.onReset();
  }

  onReset(){
    this.displayedColumns=[];
    this.dataSource=this.file.getfareAttr();
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
   
  }
  
  
  names:string[]=["transfers","agency_id","transfer_duration"];
  defaultnames:string[]=["fare_id","price","currency_type","payment_method"];

  nameget = new FormControl();
  value="";
  price="";
  currency_type="";
  addmode=false;

  edit(){
    this.addmode=true;
  }
  

  agencyid_req:boolean=false;
  agencyid="";
  transfer_duration_req:boolean=false;
  transfer_duration="";
  
  transfer_req:boolean=true;
  transfer:string="3";
  changecol(){
    var value=this.nameget.value;
    let add=false;
    var tempnames:string[]=this.displayedColumns.slice();
    for (var i=0;i<value.length;i++)
    {
      if (this.displayedColumns.includes(value[i])==false)
      {
        this.displayedColumns.push(value[i]);
        add=true;
        if (value[i]=="agency_id")
        {
          this.agencyid_req=true;
        }
        if (value[i]=="transfer_duration")
        {
          this.transfer_duration_req=true;
        }
        if (value[i]=="transfers")
        {
          this.transfer_req=true;
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
      if (tempnames[0]=="agency_id")
        {
          this.agencyid_req=false;
        }
        if (tempnames[0]=="transfer_duration")
        {
          this.transfer_duration_req=false;
        }
        if (tempnames[0]=="transfers")
        {
          this.transfer_req=false;
          this.transfer="3";
        }
      let tempindex=this.displayedColumns.indexOf(tempnames[0]);
      this.displayedColumns.splice(tempindex,1);
      for (var j=0;j<this.database.length;j++)
          this.database[j].splice(tempindex,1);
    }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
  
}
 
