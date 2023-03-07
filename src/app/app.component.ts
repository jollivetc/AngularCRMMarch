import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';
  compteur: number = 0;
  languages: string[] = ['TypeScript', 'SCSS', 'HTML', 'Java'];

  increase( $event : MouseEvent):void{
    this.compteur++;
    console.log($event);
  }
  method(language:string):void{
    console.log(language)
  }
}
