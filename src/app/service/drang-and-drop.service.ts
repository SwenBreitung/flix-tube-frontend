
// import {  Injectable, OnDestroy } from '@angular/core';
// // import { Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class DrangAndDropService implements OnDestroy {

//   constructor() { }
//   private state: any;

//   resetState() {
//     this.state = null; // Oder setze es auf den initialen Zustand zurück
//   }

//   ngOnDestroy() {
//     this.resetState(); // Bereinige den Zustand, wenn der Dienst zerstört wird
//   }
  // private maxFileSize = 500000; // 500KB
  


  // fileName: string = '';
  // uploadedImage: File | null = null;
  // imagePreviewUrl: EventEmitter<string> = new EventEmitter();

  


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
  // }





