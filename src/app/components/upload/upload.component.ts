import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  

  image:string = "assets/pictures/home-picture.jpg";

  selectedFiles!: FileList;
  currentFileUpload!: FileMetaData;
  percentage: number = 0;

  listOfFiles: FileMetaData[] = [];

  constructor(private fileService: FileService, private fireStorage: AngularFireStorage, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getAllFiles();
    this.percentage = 0;
  }

  selectFile(event: any){
    this.selectedFiles = event.target.files;
  }

  uploadFile(){

    this.currentFileUpload = new FileMetaData(this.selectedFiles[0]); 
    const path = 'Uploads/' + this.currentFileUpload.file.name;

    const storageRef = this.fireStorage.ref(path);

    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask.snapshotChanges().pipe(finalize( () => {
      storageRef.getDownloadURL().subscribe(downloadLink => {

        this.currentFileUpload.url = downloadLink;
        this.currentFileUpload.size = this.currentFileUpload.file.size;
        this.currentFileUpload.name = this.currentFileUpload.file.name;

        this.fileService.saveMetaDataOfFile(this.currentFileUpload);
        this.ngOnInit();
      })
    })
    ).subscribe((res: any) => {
      this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
    }, err => {
      console.log('Error Occured');
    });

  }

  uploadHomeImage(){

    this.currentFileUpload = new FileMetaData(this.selectedFiles[0]); 
    const path = 'Home-Images/' + this.currentFileUpload.file.name;

    const storageRef = this.fireStorage.ref(path);

    const uploadTask = storageRef.put(this.selectedFiles[0]);

    uploadTask.snapshotChanges().pipe(finalize( () => {
      storageRef.getDownloadURL().subscribe(downloadLink => {

        this.currentFileUpload.url = downloadLink;
        this.currentFileUpload.size = this.currentFileUpload.file.size;
        this.currentFileUpload.name = this.currentFileUpload.file.name;

        this.fileService.addHomeImage(this.currentFileUpload);
        this.ngOnInit();
      })
    })
    ).subscribe((res: any) => {
      this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
    }, err => {
      console.log('Error Occured');
    });

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

  deleteFiles(file: FileMetaData){

    if(window.confirm("Are you sure you want to delete" + file.name + '?')){
      this.fileService.deleteFile(file);
      this.ngOnInit;

    }

  }

  openFullscreen(content) {
		this.modalService.open(content, { fullscreen: true });
	}

}
