import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Genre, Media } from 'src/app/modules';
import { MultiMediaService } from 'src/app/services/multi-media.service';
import { environments as env } from 'src/app/environments/environments.prod';

@Component({
  selector: 'app-update-media',
  templateUrl: './update-media.component.html',
  styleUrls: ['./update-media.component.scss']
})
export class UpdateMediaComponent implements OnInit {
  form: FormGroup
  mediaId: Number
  photo : Media;
  genreList: Genre[]

  constructor(private mediaService: MultiMediaService, private activeRoute: ActivatedRoute, private fb: FormBuilder){
    this.form = this.fb.group({
      Genre: ['', Validators.required],
      Description: ['', [Validators.required]],
      // Add more form controls as needed
    },{updateOn: "submit"});
  }
  ngOnInit(): void {
    this.mediaId = parseInt(this.activeRoute.snapshot.paramMap.get('id'))
    this.photo = this.mediaService.getMedia(this.mediaId)
    this.genreList = this.mediaService.genreLis

    this.form.get('Genre').setValue(this.photo.genres)
    this.form.get('Description').setValue(this.photo.description)

  }
  getImgUrl(){
    return env.blobBaseUrl.concat(this.photo.filePath)
  }

  submit(){
    if(this.form.valid){
      let genre = this.form.get('Genre')
      let description = this.form.get('Description')

      this.mediaService.updateMedia(this.mediaId, description.value, genre.value).subscribe( res =>{
        this.mediaService.updateRecord(this.photo)
        alert('Update was succesfull')
      })
    }
  }
}

