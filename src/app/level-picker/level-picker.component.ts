import { Component, OnInit,ViewChild,Input} from '@angular/core';
import { StopservService } from '../stopserv.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-level-picker',
  templateUrl: './level-picker.component.html',
  styleUrls: ['./level-picker.component.css']
})
export class LevelPickerComponent implements OnInit {
  @Input() levelnow:string;
  @Output() notify= new EventEmitter();
  constructor(
    private file: StopservService,
  ) { }

  onsave(){
    this.file.setlevel(this.dataSource);
    this.ngOnInit();
  }

  dataSource:string[][];
  database:string[][]=[];
  dataTable : MatTableDataSource<string[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    
    this.dataSource=this.file.getlevel();
    let name:string[]= (this.dataSource)[0];
    if (!name.includes("level_name")){
      this.dataSource[0].push("level_name");
      for (var i=1;i<this.dataSource.length;i++)
      {
        this.dataSource[i].push("");
      }
    }
    this.database=this.dataSource.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
    this.setlevel(this.levelnow);
  }
  level="";
  setlevel(id:string){
    let idindex=this.dataSource[0].indexOf("level_id");
    this.notify.emit(id);
    this.level="";
    for (var i=1;i<this.dataSource.length;i++)
    {
      if (this.dataSource[i][idindex]==id)
      {
        let indindex=this.dataSource[0].indexOf("level_index");
        let level_name_index=this.dataSource[0].indexOf("level_name");
        this.level=this.dataSource[i][indindex].concat(" ",this.dataSource[i][level_name_index]);
        break;
      }
    }
  }

  addaLine(){
    this.dataSource.push(["","",""])
    this.database=this.dataSource.slice(1);
    this.dataTable=new MatTableDataSource<string[]>(this.database);
    this.dataTable.paginator = this.paginator;
  }

}
