import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit{

  imageUrl: string = 'http://localhost:8080/files/76319f2e-f51c-4202-9f18-94725da44192';
  imagesUrl: string = 'http://localhost:8080/files';
  imageToShow: any[] = [];
  listOfUrls: any = '';


  ngOnInit(){

    this.getListOfUrls();

  }

  constructor(private http: HttpClient){}

    onURLinserted(url: string) {
      this.getImage(url).subscribe(data => {
        this.createImageFromBlob(data);
      }, error => {
        console.log("Error occured",error);
      });
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  createImageFromBlob(image: Blob) {
  let reader = new FileReader(); //you need file reader for read blob data to base64 image data.
  reader.addEventListener("load", () => {
      this.imageToShow.push(reader.result); // here is the result you got from reader
  }, false);

  if (image) {
      reader.readAsDataURL(image);
  }
  }

  async getListOfUrls(){

    const response = await this.http.get(this.imagesUrl).toPromise();

    this.listOfUrls = response?.valueOf();

    console.log(this.listOfUrls[0].url);

    length = Object.keys(this.listOfUrls).length;

    for (let index = 0; index < length; index++) {

      this.onURLinserted(this.listOfUrls[index].url);
      
    }
    
    console.log(this.imageToShow);
  }



}
