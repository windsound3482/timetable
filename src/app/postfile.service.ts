import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpEvent, HttpUploadProgressEvent} from '@angular/common/http'
import {Observable,of, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostfileService {
  constructor(private http:HttpClient) { }
  Post (url: string, file: File): Observable<Object> {
    
    let formData = new FormData();
    formData.append('upload', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    
    return this.http.post('/assets', formData);
  }
  
}
