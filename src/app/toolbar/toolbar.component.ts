import { Component, OnInit } from '@angular/core';
import {Output,EventEmitter} from '@angular/core';
import { ZipService } from '../zip.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() notify= new EventEmitter();
  constructor(
    private zip:ZipService,
  ) { }

  ngOnInit(): void {
  }
  download(){
    this.zip.downloadFile();
  }

}
