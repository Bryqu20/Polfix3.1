import { Injectable } from '@angular/core';
import { UserProfile } from '../modules';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public userProfile: UserProfile | any
  constructor() {

    this.userProfile = {
      userId: 1,
      userName: 'bryk',
      createdDate: new Date()
    }

  }

  setUserProfile(data: UserProfile){
    this.userProfile = data
  }

  getUserProfile(){
    return this.userProfile
  }
}
