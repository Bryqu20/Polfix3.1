import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre, HTMLInputEvent, UserProfile } from 'src/app/modules';
import { MultiMediaService } from 'src/app/services/multi-media.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-create-media-record',
  templateUrl: './create-media-record.component.html',
  styleUrls: ['./create-media-record.component.scss']
})
export class CreateMediaRecordComponent {
  form: FormGroup;
  genreList: Genre[]

  constructor(private mediaService: MultiMediaService, private userProfile: UserDataService, private fb: FormBuilder,){

    this.genreList = this.mediaService.genreLis.filter(x => x.value !== 'all-16')
    this.form = this.fb.group({
      Genre: ['', Validators.required],
      Description: ['', [Validators.required]],
      File:['', Validators.required]
      // Add more form controls as needed
    },{updateOn: "submit"});
  }
  handleUpload(event: Event){
    let element = (event.target as  HTMLInputElement)
    let fileA : File

    if(element.files !== null){
      fileA = element.files[0]
      this.form.patchValue({
        file: fileA
      });
      this.form.get('File')?.setErrors(null)
      this.form.get('File')?.setValue(fileA)
    }

    else{
      this.form.get('File')?.setErrors({required: true})
    }
  }
  submit(){
    if(this.form.valid){
      let formData: FormData = new FormData()
      let userDetails : UserProfile = this.userProfile.getUserProfile();
      Object.entries(this.form.value).forEach(
        ([key, value]: any[]) => {
          formData.set(key, value);
        }
      )
      this.form.value
      let fileName = this.form.get('File')?.value.name
      // console.log(this.form.get('File')?.value.name)
      formData.set('UserCode',userDetails.userId.toString())
      formData.set('UserName',userDetails.userName)
      formData.set('FileName', fileName)

      this.mediaService.createRecord(formData).then( (res) =>{
        alert('Upload was succesful')
      })

    }
  }
}
