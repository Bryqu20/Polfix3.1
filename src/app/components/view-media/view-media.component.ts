import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media } from 'src/app/modules';
import { MultiMediaService } from 'src/app/services/multi-media.service';
import { environments as env } from 'src/app/environments/environments.prod';

@Component({
  selector: 'app-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss']
})
export class ViewMediaComponent implements OnInit {
  photo : Media;
  mediaId: Number
  constructor(private mediaService: MultiMediaService, private activeRoute: ActivatedRoute){

  }
  ngOnInit(): void {
      this.mediaId = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
      this.photo = this.mediaService.getMedia(this.mediaId)
  }

  getImgUrl(){
    return env.blobBaseUrl.concat(this.photo.filePath)
  }
}
