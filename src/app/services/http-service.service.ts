import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private _http: HttpClient) { }

  imagesUrl: string = "http://localhost:8080/images";

  getImages(){
    return this._http.get(this.imagesUrl);
  }
  
}
