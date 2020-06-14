import { Component, Input,OnInit } from '@angular/core';
import { Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-time-zone-select',
  templateUrl: './time-zone-select.component.html',
  styleUrls: ['./time-zone-select.component.css']
})
export class TimeZoneSelectComponent implements OnInit {

  constructor() { }
  timezone="";
  @Input() tznow:string;
  @Output() notify= new EventEmitter();
  ngOnInit(): void {
    this.timezone=this.tznow;
  }

  emitsele(sele:string){
    this.notify.emit(sele);
  }

}
