import { Component, OnInit,ViewChild} from '@angular/core';
import { AllfileService } from '../allfile.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-shapetable',
  templateUrl: './shapetable.component.html',
  styleUrls: ['./shapetable.component.css']
})
export class ShapetableComponent implements OnInit {

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
    
    this.file.setshapeTable(this.dataSource);
    window.alert('Your File shape.txt has already been saved!');
    this.onReset();
  }

  onReset(){
    this.displayedColumns=[];
    this.dataSource=this.file.getshapeTable();
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
  
  
  names:string[]=["shape_dist_traveled"];
  defaultnames:string[]=["shape_id","shape_pt_lat","shape_pt_lon","shape_pt_sequence"];
  addaLine(){
    this.database=this.dataTable.data;
    this.database.push([]);
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
  
}
