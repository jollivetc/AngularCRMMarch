import { Component, OnDestroy } from '@angular/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { DemoObservableService } from '../common/demo-observable.service';

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{

  phoneNumber:string='1234567890';
  myObservable?:Observable<number>;
  private subscriptions: Subscription[] = [];

  constructor(private demoObservable: DemoObservableService){}
  ngOnDestroy(): void {
    this.subscriptions.forEach(s=>s.unsubscribe());
  }
  callObservable():void{
    const subscription = this.demoObservable.test().pipe(
          map(x=>x*10),
          take(4)
        ).subscribe({
        next: (value:number)=>{ console.log(value)},
        error: (error:Error)=>{ console.error(error)},
        complete: ()=>{console.log('complete')}
      }
    );
    this.subscriptions.push(subscription);
  }
  callWithAsync():void{
    this.myObservable = this.demoObservable.test()
  }

}
