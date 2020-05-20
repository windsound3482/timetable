import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class GetinfoService {
  
  constructor(private http:HttpClient) { }
  getShippingPrices(){
    return this.http.get('/assets/shipping.json');
  }
}
