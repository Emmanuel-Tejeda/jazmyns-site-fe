import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  galleryImages: any[] = [];

  newData: any;
  constructor(private _httpService: HttpServiceService){}

  ngOnInit(){
    this._httpService.getImages().subscribe(res => console.log(res))
  }

}
