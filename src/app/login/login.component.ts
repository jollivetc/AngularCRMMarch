import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from './model/user';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  loginForm: FormGroup;
  errorMessageLogin = {
    required: 'le champs est obligatoire',
    minlength: 'au moins 5 caractères'
  };
  errorMessagePassword = {
    required: 'le champs est obligatoire',
    no$InPassword: 'pas de $ dans le mot de passe'
  };
  private subscriptions:Subscription[]= [];

  constructor(private authent: AuthenticationService, private router: Router){
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, no$InPassword])
    })
    this.authent.disconnect();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s=>s.unsubscribe());
  }
  logIn():void{
    const subscription: Subscription = this.authent.authentUser(this.loginForm.value.login, this.loginForm.value.password)
        .subscribe({
          next:(value:User)=>{ this.router.navigateByUrl('/home'); },
          error:(error:Error)=>{console.log(error)}
        });
    this.subscriptions.push(subscription);
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
