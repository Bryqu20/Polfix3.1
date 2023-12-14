import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators,ValidationErrors, ValidatorFn } from '@angular/forms';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
    form: FormGroup;
    takenUserName: boolean;

    constructor(private fb: FormBuilder, private identity: IdentityService ){
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required]],
        rePassword: ['', [Validators.required]]
        // Add more form controls as needed
      },{updateOn: "submit"});
      this.takenUserName = false;
    }
    submit(){
      this.checkPassword()

      if(this.form.valid){
        this.identity.register(this.form.get('username')?.value, this.form.get('password')?.value).subscribe(res =>{
          if(typeof(res) === 'object'){
            this.takenUserName = true;
          }
          else{
            this.takenUserName = false;
            alert('The registration was succesfull')
          }
        })
      }

    }
    checkPassword(){
      const pass = this.form.get('password')?.value
      const rePass = this.form.get('rePassword')?.value

      if(rePass && pass){
        if(rePass === pass){
          this.form.get('rePassword')?.setErrors(null)
        }
        else{
          this.form.get('rePassword')?.setErrors({invalidReEntered: true})
        }

      }
    }
    // {validator: checkPassword}
}


