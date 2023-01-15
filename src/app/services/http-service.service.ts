import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private _http: HttpClient) { }

  getImages(imageUrl: string){
    return this._http.get(imageUrl, { responseType: 'blob' });
  }

  getImageList(imageUrl: string){
    return this._http.get(imageUrl);
  }
  
}
