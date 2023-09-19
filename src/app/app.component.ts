import { Component } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-testing-services';

  ngOnInit() {
    const calculator = new Calculator();
    const mult_answer = calculator.multiply(2, 78);
    
  }
}
