import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  constructor() { }

  private maxFileSize = 500000; // 500KB
  


  fileName: string = '';
  uploadedImage: File | null = null;
  imagePreviewUrl: EventEmitter<string> = new EventEmitter();

  
  // handleFileDrop(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     if (file.size <= this.maxFileSize) {
  //       this.firebaseService.uploadFile(file).subscribe(
  //         progressOrUrl => {
  //           if (typeof progressOrUrl === 'string') { 
  //             resolve(progressOrUrl);
  //           } 
  //         },
  //         error => {
  //           reject(error); 
  //         }
  //       );
  //     } else {
  //       reject('File size exceeds the limit of 500KB');
  //     }
  //   });
  // }

  
  // handleFileDropForChatting(file: File, chatId: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     if (file.size <= this.maxFileSize) {
  //       this.firebaseService.uploadFileForChatting(file, chatId).subscribe(
  //         progressOrUrl => {
  //           if (typeof progressOrUrl === 'string' && !progressOrUrl.endsWith('%')) {
  //             resolve(progressOrUrl); 
  //           }
  //         },
  //         error => {
  //           reject(error);
  //         }
  //       );
  //     } else {
  //       reject('File size exceeds the limit of 500KB');
  //     }
  //   });
}
