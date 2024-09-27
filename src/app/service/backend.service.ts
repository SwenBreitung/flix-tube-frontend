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
  user: any = '';
  userFirstLetter: string = '';
  searchResults: any[] = [];


  /**
 * Loads video content data from the server by sending a GET request to the content endpoint.
 * The request includes the user's authentication token in the headers.
 * If the request is successful, the content data is stored. If not, an error is logged.
 */
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
      })
      .catch(error => {
        console.error('Failed to load content:', error);
      });
  }


  /**
 * Constructs and returns the full video URL based on the provided video ID.
 */
  getVideoUrl(id: string) {
    return this.videosContentURL + id;
  }


  /**
 * Fetches the video URL from the server for the given video ID.
 * Sends a GET request with the authentication token and returns the URL if successful.
 */
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
        return data;
      })
      .catch(error => {
        console.error('Error fetching video content:', error);
        throw error;
      });
  }


  /**
 * Sends a POST request to add a like or dislike to a video.
 * The request includes the video ID and the like type ('up' or 'down'),
 * and is authenticated using a token.
 */
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
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
      })
      .catch(error => console.error('Error adding like:', error));
  }


  /**
 * Fetches search results from the server based on the provided search query.
 * Sends a GET request with the search query and an authentication token.
 */
  loadSearchData(searchData: string): Promise<any[]> {
    const token = localStorage.getItem('token');
    const url = `http://127.0.0.1:8000/search/?query=${encodeURIComponent(searchData)}`;

    return fetch(url, {
      method: 'GET',
      credentials: 'include',
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
        return data;
      })
      .catch(error => {
        console.error('Failed to load content:', error);
        throw error;
      });
  }


  /**
 * Sends a DELETE request to remove a like from a specific video.
 */
  removeLike(videoId: string) {
    fetch(`/api/videos/${videoId}/like`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
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
      })
      .catch(error => console.error('Error removing like:', error));
  }


  /**
 * Capitalizes the first letter of the provided username and stores it in `userFirstLetter`.
 * If no username is provided, it sets `userFirstLetter` to an empty string.
 */
  capitalizeFirstLetter(username: string) {

    if (!username) {
      this.userFirstLetter = '';
    }
    this.userFirstLetter = username.charAt(0).toUpperCase();
    console.log(this.userFirstLetter, 'testing')
  }
  // getCookie(name:string) {
  //   if (document.cookie && document.cookie !== '') {
  //     const cookies = document.cookie.split(';');
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].trim();
  //       if (cookie.startsWith(name + '=')) {
  //         return decodeURIComponent(cookie.substring(name.length + 1));
  //       }
  //     }
  //   }
  //   return undefined; 
  // }

  //   getCSRFToken(): string | null {
  //     let cookieValue = null;
  //     if (document.cookie && document.cookie !== '') {
  //         const cookies = document.cookie.split(';');
  //         for (let i = 0; i < cookies.length; i++) {
  //             const cookie = cookies[i].trim();
  //             if (cookie.substring(0, 'csrftoken'.length + 1) === ('csrftoken=')) {
  //                 cookieValue = decodeURIComponent(cookie.substring('csrftoken'.length + 1));
  //                 break;
  //             }
  //         }
  //     }
  //     return cookieValue;
  // }


}
