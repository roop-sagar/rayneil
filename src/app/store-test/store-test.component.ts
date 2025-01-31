import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, double, increment, reset, save } from '../app.actions';
import { CommonModule } from '@angular/common';
import { TestService } from '../test.service';

@Component({
  selector: 'app-store-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-test.component.html',
  styleUrl: './store-test.component.css'
})
export class StoreTestComponent implements OnInit{
  count$: Observable<number>;
    private service = inject(TestService);

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }
  ngOnInit(): void {
    this.service.getAll().subscribe(data=>{
      console.log(data);
      // this.store.dispatch(save(data))
    })
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  double() {
    this.store.dispatch(double());
  }
}
