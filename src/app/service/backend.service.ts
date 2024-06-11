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
  
  loadContentData() {
    fetch('http://127.0.0.1:8000/video_content/', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Not authenticated');
      }
    })
    .then(data => {
      this.allContent = data;
      console.log('Content loaded', data);
    })
    .catch(error => {
      console.error('Failed to load content:', error);
    });
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
    const authToken = localStorage.getItem('authToken');
    console.log(authToken)
    let csrftoken = this.getCookie('csrftoken');
    console.log(csrftoken)
    // fetch(`${this.videosContentURL + videoId}/like/`, {
      fetch(`http://127.0.0.1:8000/video_content/${videoId}/like/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken      
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

  getCookie(name:string) {
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

  getCSRFToken(): string | null {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 'csrftoken'.length + 1) === ('csrftoken=')) {
                cookieValue = decodeURIComponent(cookie.substring('csrftoken'.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


}
