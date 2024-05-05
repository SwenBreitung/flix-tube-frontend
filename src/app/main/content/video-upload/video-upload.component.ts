import { Component, ElementRef, ViewChild } from '@angular/core';
import { InputComponent } from './../../../ui-components/input/input.component'
import { VideoContent } from './../../../models/video-content.class'
import { FormsModule, NgForm } from '@angular/forms';
import { PrimaryButtonComponent } from "../../../ui-components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../../ui-components/secondary-button/secondary-button.component";
import { CommonModule } from '@angular/common';
import { UniversalCardComponent } from "../../../ui-components/universal-card/universal-card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  templateUrl: './video-upload.component.html',
  styleUrl: './video-upload.component.scss',
  imports: [InputComponent, FormsModule, PrimaryButtonComponent, SecondaryButtonComponent, CommonModule, UniversalCardComponent,]
})
export class VideoUploadComponent {
  videoContent = new VideoContent();
  titleVideoField: any;
  videoUrl?:string;
  uploadedVideoFile: File | undefined = undefined;
  videoError: boolean = false;
  titleError: boolean = false;
  descriptionError: boolean = false
  uploadedImageFile: File | string = '';
  imageUrl?: string;
  uploadedVideoFileName?:string;
  
  @ViewChild('fileVideoInput') fileVideoInput?: ElementRef;
  @ViewChild('fileImageInput') fileImageInput?: ElementRef;
  constructor(
    public router: Router,
  ) { }

  getCookie(name: string) {
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return decodeURIComponent(cookie.substring(name.length + 1));
        }
      }
    }
    return undefined;
  }


  videoUpload(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();
      if (this.uploadedVideoFile) {
        formData.append('title', this.videoContent.title);
        formData.append('description', this.videoContent.description);
        formData.append('video', this.uploadedVideoFile);
        formData.append('video_imgs', this.uploadedImageFile);
      }
      console.log('test', formData);
      const csrftoken = this.getCookie('csrftoken');
      const headers: Record<string, string> = {};
      if (csrftoken) {
        headers['X-CSRFToken'] = csrftoken; // Jetzt können Sie sicher ein neues Property hinzufügen
      }

      fetch('http://127.0.0.1:8000/video_content/', {
        method: 'POST',
        headers: headers,
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      this.resetForm();
      this.router.navigate(['main/start-page']);
    } else {
      this.getTitleErrors(form)
      console.error('Formular ist nicht valide');
      console.log('Formular gültig:', form.valid);
      console.log('Formular ungültig:', form.invalid);
      console.log('Formular unberührt:', form.pristine);
      console.log('Formular bearbeitet:', form.dirty);
    }
  }

  getTitleErrors(form: NgForm) {
    if (!this.titleVideoField.errors) {
      return null;
    }
    // if (this.titleField.errors['required']) {
    //   return 'Titel ist erforderlich.';
    // }
    // if (this.titleField.errors['minlength']) {
    //   return `Titel muss mindestens ${this.titleField.errors['minlength'].requiredLength} Zeichen lang sein, aktuell sind es nur ${this.titleField.errors['minlength'].actualLength} Zeichen.`;
    // }
    return null;
  }

  resetForm() {
    this.videoContent.title = '';
    this.videoContent.description = '';
    this.resetImageInput();
    this.resetVideoInput();
  }


  resetImageInput(){
    if (this.fileImageInput && this.fileImageInput.nativeElement) {
      const input = this.fileImageInput.nativeElement as HTMLInputElement;
      input.value = '';
    }
    this.uploadedImageFile = '';
    this.imageUrl = '';
  }


  resetVideoInput(){
    this.uploadedVideoFile = undefined;
    if (this.fileVideoInput && this.fileVideoInput.nativeElement) {
      const input = this.fileVideoInput.nativeElement as HTMLInputElement;
      input.value = '';
    }
  }


  //Viedo Upload
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }


  onVideoDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      const files = event.dataTransfer.files; // files ist ein FileList-Objekt
      this.handleVideoFiles(files[0]); // Übergebe das erste File-Objekt an handleFiles
    }
  }


  onVideoFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleVideoFiles(input.files[0]); // Übergebe das erste File-Objekt an handleFiles
    }
  }


  handleVideoFiles(files: File) {
      const file = files;
      if (file && file.type.startsWith('video/')) { // Überprüft, ob es sich um eine Videodatei handelt
        console.log('Video hochgeladen:', file.name);
        this.uploadedVideoFile = file;
        this.uploadedVideoFileName = file.name;
        this.videoUrl = URL.createObjectURL(file); // Erstellt eine URL für die Videodatei
        console.log('Video-Datei:', this.uploadedVideoFile);
        // Führe hier weitere Aktionen aus, z.B. das Hochladen auf einen Server oder das Hinzufügen zur Vorschau     
    }
  }


  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  
  }


  onImageDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files) {
      const files: FileList = event.dataTransfer.files;
      this.handleFiles(files);
    }
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }


  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file && file.type.startsWith('image/')) {
        console.log('Bild hochgeladen:', file.name);
        this.uploadedImageFile = file;
        console.log('lile',file)
        console.log('uploadedImageFile',this.uploadedImageFile)
        this.imageUrl = URL.createObjectURL(file);
        // Führe weitere Aktionen aus, z.B. das Hochladen auf einen Server oder das Hinzufügen zur Vorschau
      }
    }
  }

}
