import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, double, save } from './app.actions';

export const initialState = 0;

export const appReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0),
  on(double, (state) => state +2 )
);

export const todoReducer = createReducer(
    null,
    on(save, (state) => state)
)