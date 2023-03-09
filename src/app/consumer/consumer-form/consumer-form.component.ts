import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-form',
  templateUrl: './consumer-form.component.html',
  styleUrls: ['./consumer-form.component.scss']
})
export class ConsumerFormComponent implements OnDestroy{

  consumerForm: FormGroup;
  private subscriptions:Subscription[]=[];

  constructor(private consumerService:ConsumerService, private router:Router){
    this.consumerForm = new FormGroup({
      civility: new FormControl('',[Validators.required]),
      firstname: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      phone: new FormControl('',[Validators.required])
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s=>s.unsubscribe());
  }

  save():void{
    const subscription = this.consumerService.save(this.consumerForm.value)
        .subscribe({
          next: (value:Consumer)=>{this.router.navigateByUrl('/list')},
          error: (error:Error)=>{console.error(error)}
        });
    this.subscriptions.push(subscription);
  }
}
