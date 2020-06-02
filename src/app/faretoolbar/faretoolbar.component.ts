import { Component, OnInit } from '@angular/core';

import { ZipService } from '../zip.service';
@Component({
  selector: 'app-faretoolbar',
  templateUrl: './faretoolbar.component.html',
  styleUrls: ['./faretoolbar.component.css']
})
export class FaretoolbarComponent implements OnInit {

  constructor(
    private zip:ZipService,
  ) { }

  ngOnInit(): void {
  }
  download(){
    this.zip.downloadFile();
  }

}
