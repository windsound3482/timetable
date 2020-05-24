import { Component, OnInit } from '@angular/core';
import { AllfileService } from '../allfile.service';
export interface agency {
  agency_id:string;
  agency_name:string;
  agency_url:string;
  agency_timezone:string;
  agency_lang:string;
  agency_phone:string;
}


@Component({
  selector: 'app-agencytable',
  templateUrl: './agencytable.component.html',
  styleUrls: ['./agencytable.component.css']
})
export class AgencytableComponent implements OnInit {

  constructor(
    private file:AllfileService,
  ) { }
  displayedColumns: string[]=[];
  dataSource :Array<Array<string>>;
  database :Array<Array<string>>;
  ngOnInit(): void {
    this.dataSource=[];
    this.dataSource=this.file.getagencyList();
    let name:Array<string>= (this.dataSource)[0];
    for (let i=0;i<name.length;i++){
      this.displayedColumns.push(name[i]);
    }
    this.database=this.dataSource.slice(1);
    console.log(this.database[0][2]);
    
  }

  
}
 


