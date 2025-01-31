import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TestService } from './test.service';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private testService = inject(TestService);

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
        ofType('[Movies Page] Load Movies'),
        exhaustMap(() => this.testService.getAll()
          .pipe(
            map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
            catchError(() => EMPTY)
          ))
    );
  });
}