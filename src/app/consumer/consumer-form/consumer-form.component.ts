import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-form',
  templateUrl: './consumer-form.component.html',
  styleUrls: ['./consumer-form.component.scss']
})
export class ConsumerFormComponent implements OnInit, OnDestroy{

  consumerForm: FormGroup;
  private subscriptions:Subscription[]=[];

  constructor(private consumerService:ConsumerService, private router:Router, private route: ActivatedRoute){
    this.consumerForm = new FormGroup({
      id:new FormControl(),
      civility: new FormControl('',[Validators.required]),
      firstname: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      phone: new FormControl('',[Validators.required]),
      createdAt: new FormControl()
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.consumerService.findConsumerById(id).subscribe({
        next:(consumer:Consumer)=>{this.consumerForm.patchValue(consumer)},
        error:(error:Error)=>{console.log(error)}
      })

    }
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
