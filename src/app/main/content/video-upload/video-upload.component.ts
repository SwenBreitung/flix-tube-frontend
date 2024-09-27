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
  isSwitchMenu: boolean = true;
  @ViewChild('fileVideoInput') fileVideoInput?: ElementRef;
  @ViewChild('fileImageInput') fileImageInput?: ElementRef;
  constructor(
    public router: Router,
  ) {}


  /**
 * Toggles the upload menu state based on the provided boolean value.
 * Uses the `torgleTest` method to determine the state of `isSwitchMenu`.
 */
  torgleUploadMenu(value: boolean) {
    this.isSwitchMenu = this.torgleTest(value);
    console.log(this.isSwitchMenu)
}


/**
 * Returns the opposite of the provided boolean value.
 * 
 */
torgleTest(value: boolean): boolean {
  return !value;
}


/**
 * Handles video upload by submitting form data to the backend if the form is valid.
 * The method appends the video and its metadata to a FormData object and sends
 * a POST request to the server, including an authorization token in the headers.
 * If the upload is successful, it navigates to the start page, and if there is
 * an error, it logs the error message.
 */
  videoUpload(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();
      if (this.uploadedVideoFile) {
        formData.append('title', this.videoContent.title);
        formData.append('description', this.videoContent.description);
        formData.append('video', this.uploadedVideoFile);
        formData.append('video_imgs', this.uploadedImageFile);
      }
      const token = localStorage.getItem('token');
      fetch('http://127.0.0.1:8000/video_content/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: formData,
        credentials: 'include',   
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
    }
  }


/**
 * Checks for validation errors in the title field of the form.
 * If no errors are present, it returns null.
 */
  getTitleErrors(form: NgForm) {
    if (!this.titleVideoField.errors) {
      return null;
    }
    return null;
  }


  /**
 * Resets the video upload form by clearing the title and description fields,
 * resetting the image and video input fields, and toggling the menu state.
 */
  resetForm() {
    this.videoContent.title = '';
    this.videoContent.description = '';
    this.resetImageInput();
    this.resetVideoInput();
    this.isSwitchMenu = true;
  }


  /**
 * Resets the image input field by clearing its value, removing the uploaded image file,
 * and resetting the image URL preview.
 * If the file input element exists, it resets the input field value.
 */
  resetImageInput(){
    if (this.fileImageInput && this.fileImageInput.nativeElement) {
      const input = this.fileImageInput.nativeElement as HTMLInputElement;
      input.value = '';
    }
    this.uploadedImageFile = '';
    this.imageUrl = '';
  }


  /**
 * Resets the video input field by clearing the uploaded video file reference
 * and resetting the value of the file input element if it exists.
 */
  resetVideoInput(){
    this.uploadedVideoFile = undefined;
    if (this.fileVideoInput && this.fileVideoInput.nativeElement) {
      const input = this.fileVideoInput.nativeElement as HTMLInputElement;
      input.value = '';
    }
  }


  /**
 * Handles the drag over event to prevent the default behavior and stop event propagation.
 * This is typically used to enable custom drag-and-drop behavior.
 */
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }


  /**
 * Handles the drop event when a video file is dropped onto a target element.
 * Prevents the default behavior and processes the first dropped file.
 */
  onVideoDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      const files = event.dataTransfer.files; // files ist ein FileList-Objekt
      this.handleVideoFiles(files[0]); // Übergebe das erste File-Objekt an handleFiles
    }
  }


  /**
 * Handles the event when a video file is selected via an input element.
 * Processes the first selected file from the file input.
 */
  onVideoFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleVideoFiles(input.files[0]); // Übergebe das erste File-Objekt an handleFiles
    }
  }


  /**
 * Processes the selected video file. Checks if the file is a video and, if valid,
 * stores the file, sets the file name, and creates a preview URL for the video.
 */
  handleVideoFiles(files: File) {
      const file = files;
      if (file && file.type.startsWith('video/')) {
        this.uploadedVideoFile = file;
        this.uploadedVideoFileName = file.name;
        this.videoUrl = URL.createObjectURL(file);        
    }
  }


  /**
 * Handles the drag leave event to prevent default behavior and stop event propagation.
 * Typically used to handle the event when a dragged item leaves the drop zone.
 */
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }


  /**
 * Handles the drop event when an image file is dropped onto a target element.
 * Prevents default behavior and stops event propagation. Processes the dropped file(s).
 */
  onImageDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files) {
      const files: FileList = event.dataTransfer.files;
      this.handleFiles(files);
    }
  }


  /**
 * Handles the event triggered when a file is selected via an input element.
 * Processes the selected files by passing them to the handleFiles method.
 */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }


  /**
 * Processes the provided FileList by iterating over the files.
 * For each file, it checks if the file is an image, and if valid, stores the file
 * and creates a preview URL for it.
 */
  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file && file.type.startsWith('image/')) {
        this.uploadedImageFile = file;
        this.imageUrl = URL.createObjectURL(file);
      }
    }
  }

}
