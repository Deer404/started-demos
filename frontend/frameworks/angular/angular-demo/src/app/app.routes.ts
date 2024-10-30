import { Routes } from '@angular/router';
import { TodoComponent } from '../todo/todo.component';

export const routes: Routes = [
  {
    path: 'todo',
    loadComponent: () =>
      import('../todo/todo.component').then((c) => c.TodoComponent),
  },
  {
    path: 'hello',
    loadComponent: () =>
      import('../hello/hello.component').then((c) => c.HelloComponent),
  },
];
