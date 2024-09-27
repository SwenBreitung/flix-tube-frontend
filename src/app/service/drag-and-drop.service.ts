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

}
