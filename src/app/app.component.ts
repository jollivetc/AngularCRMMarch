import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';
  compteur: number = 0;

  increase( $event : MouseEvent):void{
    this.compteur++;
    console.log($event);
  }
}
