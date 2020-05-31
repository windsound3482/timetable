import { Component, OnInit,ViewChild} from '@angular/core';
import { AllfileService } from '../allfile.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

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

    let table_name_index=this.displayedColumns.indexOf("table_name");
    let record_id_index=this.displayedColumns.indexOf("record_id");
    let record_sub_id=this.displayedColumns.indexOf("record_sub_id");
    let field_value_index=this.displayedColumns.indexOf("field_value");

    let tablenamelist=["agency","stops","routes","trips","stop_times","feed_info","pathways","levels","attributions"];

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

        //spiecal check for the detailed items
        if (!tablenamelist.includes(this.database[i][table_name_index]))
        {
          let message:string="Error at [";
            message=message.concat(i.toString(),",",table_name_index.toString(),"], table_name of translations.txt must be one of ["
            ,tablenamelist.toString(),"]");
            window.alert(message);
            return;
        }
        
        if ((this.database[i][table_name_index]=="feed_info") || 
           ((field_value_index!=-1) && 
           (this.database[i][field_value_index]!="")&& (this.database[i][field_value_index]!=null)))
           {
            if (record_id_index!=-1 && 
              (this.database[i][record_id_index]!="")&& (this.database[i][record_id_index]!=null))
              {
                let message:string="Error at [";
                message=message.concat(i.toString(),",",record_id_index.toString(),
                "], record_id of translations.txt must be forbidden if table_name equals feed_info or if field_value is defined.");
                window.alert(message);
                return;
              }
              if (record_sub_id!=-1 && 
                (this.database[i][record_sub_id]!="")&& (this.database[i][record_sub_id]!=null))
                {
                  let message:string="Error at [";
                  message=message.concat(i.toString(),",",record_sub_id.toString(),
                  "], record_sub_id of translations.txt must be forbidden if table_name equals feed_info or if field_value is defined.");
                  window.alert(message);
                  return;
                }

          }
          if ((this.database[i][table_name_index]=="feed_info") || 
            (record_id_index!=-1 && 
            (this.database[i][record_id_index]!="")&& (this.database[i][record_id_index]!=null)))
           {
            if (field_value_index!=-1 && 
              (this.database[i][field_value_index]!="")&& (this.database[i][field_value_index]!=null))
              {
                let message:string="Error at [";
                message=message.concat(i.toString(),",",field_value_index.toString(),
                "], field_value of translations.txt must be forbidden if table_name equals feed_info or if record_id is defined.");
                window.alert(message);
                return;
              }
           }

           if (field_value_index==-1 ||
            (this.database[i][field_value_index]=="") || (this.database[i][field_value_index]==null))
            {
              if (record_id_index==-1 || 
                (this.database[i][record_id_index]=="")|| (this.database[i][record_id_index]==null))
                {
                  let message:string="Error at [";
                  message=message.concat(i.toString(),",",record_id_index.toString(),
                  "], one of record_id & field_value of translations.txt must be defined.");
                  window.alert(message);
                  return;
                }
            }
          if ((this.database[i][table_name_index]=="stop_times") && 
            (record_id_index!=-1 && 
            (this.database[i][record_id_index]!="")&& (this.database[i][record_id_index]!=null)))
            {
              if (record_sub_id==-1 || 
                (this.database[i][record_sub_id]=="")|| (this.database[i][record_sub_id]==null))
                {
                  let message:string="Error at [";
                  message=message.concat(i.toString(),",",record_sub_id.toString(),
                  "], record_sub_id of translations.txt must be defined if table_name equals stop_times and record_id is defined.");
                  window.alert(message);
                  return;
                }
            }
        //simple check that all the required field has something.
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
    
    this.file.settranslation(this.dataSource);
    window.alert('Your File translations.txt has already been saved!');
    this.onReset();
  }

  onReset(){
    this.displayedColumns=[];
    this.dataSource=this.file.gettranslation();
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
  
  
  names:string[]=["record_id","record_sub_id","field_value"];
  defaultnames:string[]=["table_name","field_name","language","translation"];
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
