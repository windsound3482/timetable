import { Injectable } from '@angular/core';
import { ZipService } from './zip.service';
@Injectable({
  providedIn: 'root'
})
export class AllfileService {
  public setFile(file:Blob) {
    var reader:FileReader = new FileReader();
    reader.onload = (progressEvent) => {
      // Entire file
      console.log(reader.result);
  
      // By lines
      
    };
    reader.readAsText(file);
  }
  constructor() { }
}
