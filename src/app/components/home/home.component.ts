import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IImage } from '../gallery/image';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from 'src/app/services/mail.service';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  homeImage :any = "/assets/pictures/home-picture.jpg"


  
  listOfFiles: FileMetaData[] = [];


  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.getAllFiles();

  }

  getAllFiles(){
    this.fileService.getAllFiles().subscribe( res => {
      this.listOfFiles = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      console.log('Error occured while fetching file meta data');
    })
  }
  

}
