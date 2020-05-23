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
    this.jszip.file("agency.txt", "agency_id,agency_name,agency_url,agency_timezone,agency_lang,agency_phone\n");
    this.jszip.file("stops.txt", "stop_id,level_id,stop_name,stop_lat,stop_lon,location_type,parent_station\n");
    this.jszip.file("routes.txt", "route_id,route_short_name,route_long_name,route_desc,route_type\n");
    this.jszip.file("trips.txt", "route_id,service_id,trip_id,trip_headsign,block_id\n");
    this.jszip.file("stop_times.txt", "trip_id,arrival_time,departure_time,stop_id,stop_sequence,pickup_type,drop_off_type\n");
    
   
    
    this.jszip.file("calendar.txt", "service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date\n");
    this.jszip.file("calendar_dates.txt", "service_id,date,exception_type\n");
    this.jszip.file("fare_attributes.txt", "fare_id,price,currency_type,payment_method,transfers,transfer_duration\n");
    this.jszip.file("fare_rules.txt", "fare_id,route_id,origin_id,destination_id,contains_id\n");

    this.jszip.file("shapes.txt", "shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence,shape_dist_traveled\n");
    
    this.jszip.file("pathways.txt", "pathway_id,from_stop_id,to_stop_id,pathway_mode,is_bidirectional\n");
    this.jszip.file("frequencies.txt", "trip_id,start_time,end_time,headway_secs\n");

    this.jszip.file("shapes.txt", "shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence,shape_dist_traveled\n");
    
    this.jszip.file("transfers.txt", "from_stop_id,to_stop_id,transfer_type,min_transfer_time\n");
    this.jszip.file("levels.txt", "level_id,level_index,level_name,elevation\n");

    this.jszip.file("translations.txt", "table_name,field_name,language,translation,record_id\n");
    
    this.jszip.file("attributions.txt", "attribution_id,is_producer,is_operator,organization_name,agency_id\n")
  }
  

  public getZipContent(file) {
    this.jszip.loadAsync(file).then((zip) => {
        zip.forEach((relativePath, defile) => {
          console.log("iterating over", relativePath);
          defile.async("blob").then((data)=> {
            this.allfile.setFile(data);
          });
          
        });
      });
  }
 
}
