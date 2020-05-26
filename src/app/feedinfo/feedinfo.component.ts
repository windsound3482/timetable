import { Component, OnInit } from '@angular/core';
import { AllfileService } from '../allfile.service';
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
  dataSource :Array<Array<string>>;
  database :Array<Array<string>>;
  ngOnInit(): void {
    this.dataSource=[];
    this.dataSource=this.file.getfeedinfo();
    let name:Array<string>= (this.dataSource)[0];
    for (let i=0;i<name.length;i++){
      this.displayedColumns.push(name[i]);
    }
    this.database=this.dataSource.slice(1);
    
  }
  
  onSave(){
    this.dataSource=[];
    this.dataSource.push(this.displayedColumns);
    this.dataSource=this.dataSource.concat(this.database);
    
    this.file.setagencyList(this.dataSource);
    window.alert('Your File feed_info.txt has already been saved!');
  }

}
