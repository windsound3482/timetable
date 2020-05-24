import { Injectable } from '@angular/core';
import { ZipService } from './zip.service';
@Injectable({
  providedIn: 'root'
})
export class AllfileService {
  
  agencylist:Array<Array<string>>=[];
  public setFile(file:Blob,filename:string) {
    let items:Array<Array<string>>=[]; 
    var reader:FileReader = new FileReader();
    reader.onload = (progressEvent) => {
  
      // By lines
      var lines = (reader.result as string).split('\n');
      for(var line = 0; line < lines.length; line++){
        items[line]=(lines[line] as string).split(',');
      }
    };
    console.log(filename);
    reader.readAsText(file);
    if (filename==="agency.txt")
    {
      this.agencylist=items;
    }
  }
  
  public getagencyList(){
    return this.agencylist;
  }
  constructor() {
    this.agencylist=[["agency_id","agency_name","agency_url","agency_timezone","agency_phone","agency_lang"]
    ,["FunBus","The Fun Bus","http://www.thefunbus.org","America/Los_Angeles,(310) 555-0222","en"]];
  }
}
