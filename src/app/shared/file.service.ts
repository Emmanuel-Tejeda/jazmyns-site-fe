import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FileMetaData } from '../model/file-meta-data';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fireStore: AngularFirestore, private fireStorage: AngularFireStorage) { }

  saveMetaDataOfFile(fileObj: FileMetaData){
    
    const fileMeta = {
      id: '',
      name: fileObj.name,
      url: fileObj.url,
      size: fileObj.size
    }

    fileMeta.id = this.fireStore.createId();

    this.fireStore.collection('Upload').add(fileMeta);

  }

  addHomeImage(fileObj: FileMetaData){
    
    const fileMeta = {
      id: '',
      name: fileObj.name,
      url: fileObj.url,
      size: fileObj.size
    }

    fileMeta.id = this.fireStore.createId();

    this.fireStore.collection('Home-Image').add(fileMeta);
  }

  getHomeImage(){
    return this.fireStore.collection('/Home-Image').snapshotChanges();
  }

  deleteHomeImage(){
    
  }

  getAllFiles(){
    return this.fireStore.collection('/Upload').snapshotChanges();
  }

  deleteFile(fileMeta: FileMetaData){
    this.fireStore.collection('/Upload').doc(fileMeta.id).delete();
    this.fireStorage.ref('/Uploads/' + fileMeta.name).delete();
  }

}
