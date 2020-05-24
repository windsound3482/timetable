import { Injectable } from '@angular/core';
import { AllfileService } from './allfile.service';
import * as JSZip from 'jszip';
import * as fs from 'fs'
import * as FileSaver from 'file-saver';
import { zip } from 'rxjs';

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

  public downloadFile()
  {
    let temp:string[][]=this.allfile.getagencyList();
    let tempstr:string ='';
    let temprow=temp.length;
    
    for (var i=0;i<temprow;i++)
    {
      let tempstrr:string[]=temp[i];
      console.log(tempstrr.toString());
      tempstr=tempstr.concat(tempstrr.toString());
      tempstr=tempstr.concat('\n');
    }
    this.jszip.file("agency.txt",tempstr);
    this.jszip.generateAsync({type:"blob"}).then((blob) => {
      FileSaver.saveAs(blob, "hello.zip");
    });
  }
 
}
