import { Component, OnInit } from '@angular/core';
import {Output,EventEmitter} from '@angular/core';
import { ZipService } from '../zip.service';
import { CalendarservService } from '../calendarserv.service';
@Component({
  selector: 'app-tb-for-calen',
  templateUrl: './tb-for-calen.component.html',
  styleUrls: ['./tb-for-calen.component.css']
})
export class TbForCalenComponent implements OnInit {

  @Output() notify= new EventEmitter();
  constructor(
    private zip:ZipService,
    private cal: CalendarservService  ,
  ) { }

  ngOnInit(): void {
  }
  download(){
    this.zip.downloadFile();
  }

  switchmode(){
    this.cal.setmode(!this.cal.getmode());
    this.cal.setcalender([["service_id","monday","tuesday","wednesday","thursday",
    "friday","saturday","sunday","start_date","end_date"]]);
    this.cal.setexp([["service_id","date","exception_type"]]);
    this.notify.emit();
  }

}
