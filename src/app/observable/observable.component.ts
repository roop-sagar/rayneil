import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable',
  standalone: true,
  imports: [],
  templateUrl: './observable.component.html',
  styleUrl: './observable.component.css'
})
export class ObservableComponent {

  myObs = new Observable()

  
}
