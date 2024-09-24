import { Injectable } from '@angular/core';
import { VideoContent } from './../models/video-content.class'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  baseURL = 'http://127.0.0.1:8000/'
  //baseURL = 'http://34.17.50.169/'
  videosContentURL: string = 'http://127.0.0.1:8000/video_content/'
  //videosContentURL: string = 'http://34.17.50.169/video_content/'
  allContent: VideoContent[] = [];
  videoID: string = '';
  user:any = '';
  userFirstLetter:string = '';

  loadContentData() {
    const token = localStorage.getItem('token'); 
    fetch('http://127.0.0.1:8000/video_content/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('Server response:', response);
        return response.json().then(err => {
            throw new Error(`Error: ${err.detail || 'Not authenticated'}`);
        });
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
    const token = localStorage.getItem('token');
    return fetch(this.videosContentURL + videoId + '/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
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
    const token = localStorage.getItem('token'); 
      fetch(`http://127.0.0.1:8000/video_content/${videoId}/like/`, {
        method: 'POST',  
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
          likeType: likeType
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('send data',response);
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

  loadSearchData(searchData: string): Promise<any[]> {
    const token = localStorage.getItem('token'); 
    const url = `http://127.0.0.1:8000/search/?query=${encodeURIComponent(searchData)}`;
    
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(err => {
          throw new Error(`Error: ${err.detail || 'Not authenticated'}`);
        });
      }
    })
    .then(data => {
      console.log('search', data);
      return data;  
    })
    .catch(error => {
      console.error('Failed to load content:', error);
      throw error;
    });
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

  capitalizeFirstLetter(username: string) {
    
    if (!username) {
      this.userFirstLetter = ''; 
    }
    this.userFirstLetter =username.charAt(0).toUpperCase();
    console.log(this.userFirstLetter , 'testing')
  }
}
