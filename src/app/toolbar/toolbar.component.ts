import { Component, OnInit } from '@angular/core';

import { ZipService } from '../zip.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  constructor(
    private zip:ZipService,
  ) { }

  ngOnInit(): void {
  }
  download(){
    this.zip.downloadFile();
  }

}
