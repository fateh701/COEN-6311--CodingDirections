import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthResData } from './authentication.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})



export class AuthenticationComponent{
  isLoginMode = true; //This variable will be used to determine if the user is in the login mode or the signup mode
  signupForm: FormGroup; //This variable will be used to store the form that will be used to sign up the user
  loginForm: FormGroup; //This variable will be used to store the form that will be used to log in the user
  error: string = ''; //This variable will be used to store any error messages that are returned from the server
  token: string | undefined; //This variable will be used to store the token that is returned from the server
  success:string=''; //This variable will be used to store any success messages that are returned from the server
  userTypes: string[] = ['Admin', 'Agent', 'User'];

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.signupForm = new FormGroup({
      'first_name': new FormControl(null,Validators.required),
      'last_name': new FormControl(null,Validators.required),
      'username': new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'user_type': new FormControl(null,Validators.required),
      'passwords': new FormGroup({
          'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
          'confirmpassword': new FormControl(null, Validators.required)
        },this.passwordCheck
        )
    });

    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(8)])
    });
    //this.authenticationService.autoLogin();

    }


  onSwitch(){
    this.isLoginMode = !this.isLoginMode; //This function will be used to switch between the login mode and the signup mode

  }

  onSignup(){
    console.log(this.signupForm.value);
    this.authenticationService.signup({
      'first_name': this.signupForm.value.first_name,
      'last_name': this.signupForm.value.last_name,
      'username': this.signupForm.value.username,
      'email': this.signupForm.value.email,
      'user_type': this.signupForm.value.user_type,
      'password': this.signupForm.value.passwords.password
    }).subscribe(
      (data: AuthResData) => {
        this.isLoginMode = true;
        this.success = 'signup successful';
        this.error = '';

      },(errorRes) => {
        this.error = errorRes;
      }
    )
  }


  onLogin(){
    this.authenticationService.login(this.loginForm.value).subscribe(
      (data: AuthResData) => {
        this.token = data.token;
        console.log(data);
        this.router.navigate(['/profile'])
      },(errorRes) => {
        this.error = errorRes;
      }
    )
    this.loginForm.reset()
  }



  passwordCheck(): Validators {
    return (control: FormControl): { [key: string]: boolean } | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmpassword')?.value;

      if ( password != confirmPassword) {
        return {'notsame': true};
      }

      return null;  // Return false if passwords match
    };
  }

  // passwordCheck(control: FormGroup): { [p: string]: boolean } | null{
  //   if(control.get('password') != control.get('confirmpassword')){
  //     return {'notsame': true}
  //   }
  //   return null;
  // }






}

