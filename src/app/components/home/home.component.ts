import { Component, OnInit } from '@angular/core';
import { Genre, Media, UserProfile } from 'src/app/modules';
import { MultiMediaService } from 'src/app/services/multi-media.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { environments as env } from 'src/app/environments/environments.prod';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserProfile
  userMedia: Array<any>
  genreList: Genre[]
  filteredMedia: Media[]

  constructor(private userProfile: UserDataService, private mediaService: MultiMediaService, public dialog: MatDialog){
    const date = new Date('2023-12-06T17:23:40.85')
    this.userMedia = []
    this.genreList = []
    this.user = {
      userId: 1,
      userName: 'bryk',
      createdDate: date}
  }

  ngOnInit(){
    let result = undefined;
    result = this.userProfile.getUserProfile()

    this.user = (result !== undefined) ? result : this.user
    this.genreList = this.mediaService.genreLis
    this.mediaService.fetchData().subscribe((res:any) =>{
    let mediaList: Media[] =  res.map(x =>{
        return{
          id: x.Id,
          fileName: x.FileName,
          userId: x.UserId,
          userName: x.UserName,
          filePath: x.FilePath,
          fileLocation: x.FileLocation,
          description: x.Description,
          genres: x.Genres
        }})
      this.mediaService.setMediaList(mediaList)
      this.userMedia = this.mediaService.getUserMedia(this.user.userId)
      this.filteredMedia = this.userMedia
    })
  }
  onFilterChange(res : any){
    if(res.value === 'all-16' || res.value === undefined ){
      this.filteredMedia = this.userMedia
    }
    else{
      let selectedGenre = this.genreList.find(x => x.value === res.value)
      this.filteredMedia = this.userMedia.filter(x => x.genres === selectedGenre.viewValue)
    }

  }
  openDeleteDialog(mediaId : Number){
  let dialogRef = this.dialog.open(DeleteDialogComponent);
  dialogRef.afterClosed().subscribe(res =>{
    let result = JSON.parse(res)
    if(result){
      this.mediaService.deleteMedia(mediaId).subscribe(res =>{
        this.mediaService.removeMedia(mediaId)
        this.userMedia = this.mediaService.getUserMedia(this.user.userId)
        alert('Deletion was succesfull')
      })
    }
  })
  }
  getImgSrc(imgPath: string){
    return env.blobBaseUrl.concat(imgPath);
  }
}

// id: Number,
// fileName: string,
// userId: Number,
// userName: string,
// filePath: string,
// fileLocation: string,
// description: string,
// genres: string
