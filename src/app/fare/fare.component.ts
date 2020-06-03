import { Component, OnInit,ViewChild} from '@angular/core';
import { FareservService } from '../fareserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { FareruleComponent } from '../farerule/farerule.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.css']
})
export class FareComponent implements OnInit {
  constructor(
    private file:FareservService,
  ) { }

  @ViewChild(FareruleComponent ) farerule: FareruleComponent;
  displayedColumns: string[]=[];
  dataSource :string[][];
  database :string[][]; 
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.onReset();
    this.farerule.ngOnInit();
  }
 
  
  
  onSave(){
    let priceindex=this.displayedColumns.indexOf("price");
    let transferindex=this.displayedColumns.indexOf("transfers");
    let trans_durindex=this.displayedColumns.indexOf("transfer_duration");
    let agidindex=this.displayedColumns.indexOf("agency_id");
    let payindex=this.displayedColumns.indexOf("payment_method");
    let currindex=this.displayedColumns.indexOf("currency_type");
    let idindex=this.displayedColumns.indexOf("fare_id");
    let tempinput:string[]=Array(this.displayedColumns.length).fill("");
    tempinput[idindex]=this.value;
    tempinput[priceindex]=this.price;
    tempinput[currindex]=this.currency_type;
    tempinput[payindex]=this.paymethod;
    tempinput[transferindex]=this.transfer;
    if (this.transfer=="3")
      tempinput[transferindex]="";
    if (trans_durindex>-1)
      tempinput[trans_durindex]=this.transfer_duration;
    if (agidindex>-1)
      tempinput[agidindex]=this.agencyid;
    if (this.current==this.dataSource.length)
    {
      this.dataSource.push(tempinput);
    }
    else
    {
      this.dataSource.splice(this.current,1,tempinput);
    }
    
    this.file.setfareAttr(this.dataSource);
    window.alert('Your File fare_attributes.txt has already been saved!');
    this.onReset();
  }
  
  onDelete(){
    this.dataSource.splice(this.current,1);
    let datarule=this.file.getfareRule();
    let index=datarule[0].indexOf("fare_id");
    for (var i=1;i<datarule.length;i++)
    {
      if (datarule[i][index]==this.value)
      {
        datarule.splice(i,1);
        break;
      }
    }
    this.file.setfareRule(datarule);
    this.file.setfareAttr(this.dataSource);
    window.alert('Your File fare_attributes.txt has already been saved!');
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

    this.value="";
    this.price="";
    this.currency_type="";
    this.paymethod="0";

    this.agencyid="";
    this.transfer_duration="";
    
    this.transfer="3";
    this.addmode=false;
    this.deletemode=false;
  }
  
  
  names:string[]=["agency_id","transfer_duration"];
  defaultnames:string[]=["fare_id","price","currency_type","payment_method","transfers"];

  nameget = new FormControl();
  
  
  addmode=false;
  deletemode=false;
  
  edit(){
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
      this.deletemode=true;
      this.price=this.dataSource[this.current][this.displayedColumns.indexOf("price")];
      this.transfer=this.dataSource[this.current][this.displayedColumns.indexOf("transfers")];
      if (this.transfer=="")
      {
        this.transfer="3";
      }
      if (this.displayedColumns.indexOf("transfer_duration")>-1)
        this.transfer_duration=this.dataSource[this.current][this.displayedColumns.indexOf("transfer_duration")];
      if (this.displayedColumns.indexOf("agency_id")>-1)
        this.agencyid=this.dataSource[this.current][this.displayedColumns.indexOf("agency_id")];
      this.paymethod=this.dataSource[this.current][this.displayedColumns.indexOf("payment_method")];
      this.currency_type=this.dataSource[this.current][this.displayedColumns.indexOf("currency_type")];
    }
  }
  
  current:number;

  value="";
  price="";
  currency_type="";
  paymethod="0";

  agencyid_req:boolean=false;
  agencyid="";
  transfer_duration_req:boolean=false;
  transfer_duration="";
  
  
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
        this.dataSource.splice(0,1,this.displayedColumns);
        add=true;
        if (value[i]=="agency_id")
        {
          this.agencyid_req=true;
        }
        if (value[i]=="transfer_duration")
        {
          this.transfer_duration_req=true;
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
 
