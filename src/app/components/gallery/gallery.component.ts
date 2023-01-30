import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { StorageService } from 'src/app/services/storage.service';
import { FileService } from 'src/app/shared/file.service';
import { IImage } from './image';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit{
  
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
