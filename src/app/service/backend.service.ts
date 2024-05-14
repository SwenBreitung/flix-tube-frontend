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
        console.log('allContentbevore', data);
        this.allContent = data;
        console.log('allContent', this.allContent);
        // Hier kannst du weiteren Code hinzufügen, um die Daten zu verwenden
      })
      .catch(error => console.error('Error fetching video content:', error));
  }

  getVideoUrl(id: string) {
    return this.videosContentURL + id;
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
        console.log('fetchData', data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching video content:', error);
        throw error;
      });
  }

  // JSON.stringify({ likeType: likeType })
  addLike(videoId: string, likeType: string) {
    // fetch(`${this.videosContentURL + videoId}/like/`, {
      fetch(`http://127.0.0.1:8000/video_content/${videoId}/like/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + yourAuthToken ,// Auth-Token des Benutzers  
      },
      body: JSON.stringify({
        likeType: 'up'
      })
    })
      .then(response => {
        if (response.ok) {
          console.log('send data')
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        console.log('Like added successfully:', data);
      })
      .catch(error => console.error('Error adding like:', error));
  }


  removeLike(videoId: string) {
    fetch(`/api/videos/${videoId}/like`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + yourAuthToken // Auth-Token des Benutzers
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        console.log('Like removed successfully:', data);
        // Update UI entsprechend
      })
      .catch(error => console.error('Error removing like:', error));
  }
}
