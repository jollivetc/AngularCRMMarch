import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessageLogin = {
    required: 'le champs est obligatoire',
    minlength: 'au moins 5 caractères'
  };
  errorMessagePassword = {
    required: 'le champs est obligatoire',
    no$InPassword: 'pas de $ dans le mot de passe'
  };

  constructor(private authent: AuthenticationService){
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, no$InPassword])
    })
  }
  logIn():void{
    const user = this.authent.authentUser(this.loginForm.value.login, this.loginForm.value.password);
    console.log(user)
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
