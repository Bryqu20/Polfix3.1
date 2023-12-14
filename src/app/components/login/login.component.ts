import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/modules';
import { IdentityService } from 'src/app/services/identity.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  incorrectCredentials: boolean
  data: UserProfile | any

  constructor(private fb: FormBuilder, private identity: IdentityService, private router: Router, private userProfile: UserDataService ) {
    this.form = this.fb.group({
      // Define your form controls with validators
      username: ['', Validators.required],
      password: ['', Validators.required],
      // Add more form controls as needed
    },{ updateOn: 'submit' });
    this.incorrectCredentials = false
  }
  submit(){
    if(this.form.valid){
      const userName = this.form.get('username')
      this.identity.login(userName?.value, this.form.get('password')?.value).subscribe((res) =>{
        if(res.hasOwnProperty('message')){

          this.incorrectCredentials = true;
        }
        else{
          this.data = res
          this.incorrectCredentials = false;
          this.userProfile.setUserProfile(this.data);
          this.form.reset()
          this.router.navigateByUrl('home');
        }
      })
    }
  }
}
