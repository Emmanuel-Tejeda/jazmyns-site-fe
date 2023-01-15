import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  imageToShow!: any;

  galleryImages?: any;

  imageUrl: string = 'http://localhost:8080/files/76319f2e-f51c-4202-9f18-94725da44192';
  imagesUrl: string = "http://localhost:8080/files";


  isImageLoading!: boolean;

  constructor(private _httpService: HttpServiceService){}

  ngOnInit(){

    this.getImageList();

    this.isImageLoading = true;
      this._httpService.getImages(this.imageUrl).subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
    }, false);

    if (image) {
        reader.readAsDataURL(image);
    }
  }

  getImageList(){
    return this._httpService.getImageList(this.imagesUrl).subscribe((data =>{
      this.galleryImages = data;
      Object.keys(data)
        console.log(data);
      }));
  }

  


}
