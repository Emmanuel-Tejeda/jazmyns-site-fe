import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IImage } from './image';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit{

  imagesUrl: string = 'http://localhost:8080/jazmyn/file';
  imageToShow: IImage[] = [];
  listOfUrls: any = '';


  ngOnInit(){

    this.getListOfUrls();

  }

  constructor(private http: HttpClient){}

    onURLinserted(url: string) {
      this.getImage(url).subscribe(data => {

        this.createImageFromBlob(data, url);
      }, error => {
        console.log("Error occured",error);
      });
      
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  createImageFromBlob(image: Blob, imageUrl: string) {
  let reader = new FileReader(); //you need file reader for read blob data to base64 image data.
  reader.addEventListener("load", () => {

      let newImage: IImage = {
        image: reader.result,
        url: imageUrl
        
      };
      this.imageToShow.push(newImage); // here is the result you got from reader
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

      this.onURLinserted(this.listOfUrls[index]?.url);
      
    }
    
    console.log(this.imageToShow);
    
  }

  deleteImage(imageUrl: string){

    console.log(imageUrl);

    
    this.http.delete(imageUrl)
        .subscribe((status) => { 
         console.log(status);
      });
      
  }



}
