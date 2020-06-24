import { Component, OnInit ,ViewChild} from '@angular/core';
import { AllfileService } from '../allfile.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
@Component({
  selector: 'app-feedinfo',
  templateUrl: './feedinfo.component.html',
  styleUrls: ['./feedinfo.component.css']
})
export class FeedinfoComponent implements OnInit {

  constructor(
    private file:AllfileService,
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
    for (var i=this.database.length - 1;i>=0;i--)
    {
      let deleteeable=true;
      for (var j=0;j<tempindex;j++)
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
    
    this.file.setfeedinfo(this.dataSource);
    window.alert('Your File feed_info.txt has already been saved!');
    this.onReset();
  }
  startatlist_start:FormControl[];
  startatlist_end:FormControl[];
  onReset(){
    this.displayedColumns=[];
    this.dataSource=this.file.getfeedinfo();
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
    let datestartindex=this.displayedColumns.indexOf("feed_start_date");
    let dateendindex=this.displayedColumns.indexOf("feed_end_date");
    this.startatlist_start=new Array(this.database.length).fill(null);
    this.startatlist_end=new Array(this.database.length).fill(null);
    if (datestartindex>-1)
      for (var i=0;i<this.database.length;i++)
      {
        console.log(this.database[i]);
        if (this.database[i][datestartindex])
          this.startatlist_start[i]=new FormControl(new Date(parseInt(this.database[i][datestartindex].slice(0,4)),parseInt(this.database[i][datestartindex].slice(4,6))-1,parseInt(this.database[i][datestartindex].slice(6))));
      }
    if ( dateendindex>-1)
      for (var i=0;i<this.database.length;i++)
      {
        if (this.database[i][dateendindex])
          this.startatlist_end[i]=new FormControl(new Date(parseInt(this.database[i][ dateendindex].slice(0,4)),parseInt(this.database[i][ dateendindex].slice(4,6))-1,parseInt(this.database[i][ dateendindex].slice(6))));
      }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
    
  }
  
  
  names:string[]=["default_lang","feed_start_date","feed_end_date","feed_version","feed_contact_email","feed_contact_url"];
  defaultnames:string[]=["feed_publisher_name","feed_publisher_url","feed_lang"];
  addaLine(){
    this.database=this.dataTable.data;
    this.database.push([]);
    this.startatlist_start.push(null);
    this.startatlist_end.push(null);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }

  nameget = new FormControl();
  
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
      let tempindex=this.displayedColumns.indexOf(tempnames[0]);
      this.displayedColumns.splice(tempindex,1);
      for (var j=0;j<this.database.length;j++)
          this.database[j].splice(tempindex,1);
    }
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }

  adddate(event: MatDatepickerInputEvent<Date>,i,j){
    const date:string =
      event.value.getFullYear() +
      ("00" + (event.value.getMonth()+1)).slice(-2) +
      ("00" + event.value.getDate()).slice(-2);
    this.database=this.dataTable.data;
    this.database[j][i]=date;
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }
}
 