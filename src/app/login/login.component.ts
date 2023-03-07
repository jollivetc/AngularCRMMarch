import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(){
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, no$InPassword])
    })
  }
  logIn():void{
    console.log(this.loginForm)
  }
  isLoginInvalid():boolean{
    return !!((this.loginForm.get('login')?.touched || this.loginForm.get('login')?.dirty)) && !!this.loginForm.get('login')?.errors
  }
}

function no$InPassword(c:AbstractControl):ValidationErrors | null{
  if((c.value as string).indexOf('$') < 0){
    return null;
  }else{
    return {
      no$InPassword: false
    }
  }
}
