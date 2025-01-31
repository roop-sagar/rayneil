import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Todo {
  "userId": number,
  "id": number,
  "title": string,
  "completed": boolean
}

@Injectable({
  providedIn: 'root'
})
export class TestService {
constructor(
  private http: HttpClient,
 ) { }

  getAll(): Observable<Todo> {
    return this.http.get<Todo>('https://jsonplaceholder.typicode.com/todos');
  }
}
