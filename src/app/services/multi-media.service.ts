import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments as env } from '../environments/environments.prod';
import { APIResponse, Genre, Media } from '../modules';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiMediaService {
  public mediaList: Array<Media>
  public genreLis: Genre[]

  constructor(private http: HttpClient) {
    this.mediaList = []
    this.genreLis=[
      {
        value: 'all-16',
        viewValue: 'All'
      },
      {
        value: 'landscape-0',
        viewValue: 'Landscape'
      },
      {
        value: 'nature-1',
        viewValue: 'Nature'
      },
      {
        value: 'portrait-2',
        viewValue: 'Portrait'
      },
      {
        value: 'street-3',
        viewValue: 'Street'
      },
      {
        value: 'architectural-4',
        viewValue: 'Architectural'
      },
      {
        value: 'sport-5',
        viewValue: 'Sport'
      },
      {
        value: 'abstract-6',
        viewValue: 'Abstract'
      },
      {
        value: 'astral-7',
        viewValue: 'Astral'
      },
      {
        value: 'composite-8',
        viewValue: 'Composite'
      },
      {
        value: 'event-9',
        viewValue: 'Event'
      },
      {
        value: 'editorial-10',
        viewValue: 'Editorial'
      },
      {
        value: 'wedding-11',
        viewValue: 'Wedding'
      },
      {
        value: 'product-12',
        viewValue: 'Product'
      },
      {
        value: 'treval-13',
        viewValue: 'Treval'
      },
      {
        value: 'food-14',
        viewValue: 'Food'
      }
    ]
   }

   getMediaList(){
    return this.mediaList
   }

  setMediaList(list: Media[]){
    this.mediaList = list;
  }
  fetchData(): Observable<any> {
    return this.http.get<any>(env.getMultiMedia)
  }

  deleteMedia(mediaId: Number): Observable<any>{
    return this.http.delete<any>(env.deleteMedia.replace('{id}', mediaId.toString()))
  }

  removeMedia(mediaId: Number){
    this.mediaList = this.mediaList.filter(x => x.id !== mediaId)
  }

  updateRecord(media: Media){
    let mediaId = media.id
    const indx = this.mediaList.findIndex( x => x.id ===  mediaId);
    this.mediaList[indx].genres = media.genres
    this.mediaList[indx].description = media.description
  }

  updateMedia(mediaId: Number,description: string, genres: string): Observable<any>{
    return this.http.put<any>(env.updateMedia.replace('{id}', mediaId.toString()),{Description: description, Genres: genres})
  }

  async createRecord(form: FormData){
    return this.http.post<any>(env.createMedia, form).subscribe(res =>{

    }, (error) =>{console.log(error)})
  }

  getMedia(mediaId: Number){
    return this.mediaList.find(x => x.id === mediaId);
  }

  getUserMedia(userId: Number){
    let result = this.mediaList.filter(x => x.userId === userId)
    return result;
  }

}
