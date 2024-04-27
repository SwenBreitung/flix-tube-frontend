import { Component } from '@angular/core';
import { InputComponent } from './../../../ui-components/input/input.component'
@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [InputComponent,],
  templateUrl: './video-upload.component.html',
  styleUrl: './video-upload.component.scss'
})
export class VideoUploadComponent {


  
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Dies verhindert, dass der Browser das standardmäßige Drag-Verhalten ausführt.
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    }
  }

  onFileSelected(event: any) {
    this.handleFiles(event.target.files);
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      console.log('Datei hochgeladen:', files[i].name);
      // Hier könnte der Upload-Prozess implementiert werden
    }
  }
}
