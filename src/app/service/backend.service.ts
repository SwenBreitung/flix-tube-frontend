import { Injectable } from '@angular/core';
import { VideoContent } from './../models/video-content.class'

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(

  ) { }
  baseURL = 'http://127.0.0.1:8000/'
  videosContentURL: string = 'http://127.0.0.1:8000/video_content/'
  allContent: VideoContent[] = [];
  videoID: string = '';


  loadeContentData() {
    fetch(this.videosContentURL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.allContent = data.results; // Befülle die Variable mit den erhaltenen Daten
        console.log(this.allContent); // Logge die Daten zur Überprüfung
        // Hier kannst du weiteren Code hinzufügen, um die Daten zu verwenden
      })
      .catch(error => console.error('Error fetching video content:', error));
  }

  getVideoUrl(id:string){
  return  this.videosContentURL + id;
  }


  fetchVideoUrl(videoId: string): Promise<string> {
    return fetch(this.videosContentURL + videoId)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching video content:', error);
        throw error;
      });
  }
  
  // fetchVideoUrl(videoId: string): Observable<string> {
  //   const url = `${this.videosContentURL}/${videoId}/url`; // Beispiel-Endpunkt für Video-URLs
  //   return this.http.get<string>(url);
  // }
}
