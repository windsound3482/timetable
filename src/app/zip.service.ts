import { Injectable } from '@angular/core';
import { AllfileService } from './allfile.service';
import * as JSZip from 'jszip';
import * as fs from 'fs'
@Injectable({
  providedIn: 'root'
})
export class ZipService {
  jszip = new JSZip();
  constructor(private allfile:AllfileService) { 
  }

  public   getZipContent (file): Array<string>{ 
    let files:Array<string>=[];
    this.jszip.loadAsync(file).then((zip) => {
       
        zip.forEach((relativePath, defile) => {
          defile.async("blob").then((data)=> {
            this.allfile.setFile(data,defile.name);
          });
          files.push(relativePath.concat(' has been added'));
        });
        
      });
      return files;
  }
 
}
