import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import {transit_realtime} from 'timetable';

@Injectable({
  providedIn: 'root'
})
export class RealtimeservService {
  feed;
  names="hello.pb";
  setfeed(tempfeed)
  {
    this.feed=tempfeed;
  }

  getfeed()
  {
    return this.feed;
  }

  setname(tempname)
  {
    this.names=tempname;
  }

  download(){
    var errMsg =transit_realtime.FeedMessage.verify(this.feed);
    if (errMsg)
    {
       window.alert(errMsg);
       return;
    }
    let binary=transit_realtime.FeedMessage.encode(this.feed).finish();
    let b = new Blob([binary],{type:"application/octet-binary"});
    FileSaver.saveAs(b, this.names);
  }
  constructor() { 
    let feedhead=transit_realtime.FeedHeader.create({
      gtfs_realtime_version: "2.0",
      incrementality: 0,
      timestamp: Math.round(new Date().getTime()/1000)
    });
    this.feed=transit_realtime.FeedMessage.create(
      {header:feedhead,
        entity:[]
      }
    )
    
  }
}
