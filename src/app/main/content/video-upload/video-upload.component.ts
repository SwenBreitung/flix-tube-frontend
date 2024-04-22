import { Component } from '@angular/core';
// import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [],
  templateUrl: './video-upload.component.html',
  styleUrl: './video-upload.component.scss'
})
export class VideoUploadComponent {
constructor(){
  // this.subscription = this.DrangAndDropService.getData().subscribe(data => {
  //   console.log(data);
  // });
}

ngOnInit() {
  console.log('VideoUploadComponent initialized');
}

ngOnDestroy() {
  console.log('VideoUploadComponent destroyed');
}




  // onDragOver(event: DragEvent) {
  //   event.preventDefault(); // Dies verhindert, dass der Browser das standardmäßige Drag-Verhalten ausführt.
  // }

  // onDrop(event: DragEvent) {
  //   event.preventDefault();
  //   if (event.dataTransfer && event.dataTransfer.files) {
  //     const files = event.dataTransfer.files;
  //     this.handleFiles(files);
  //   }
  // }

  // onFileSelected(event: any) {
  //   this.handleFiles(event.target.files);
  // }

  // handleFiles(files: FileList) {
  //   for (let i = 0; i < files.length; i++) {
  //     console.log('Datei hochgeladen:', files[i].name);
  //     // Hier könnte der Upload-Prozess implementiert werden
  //   }
  // }
}
