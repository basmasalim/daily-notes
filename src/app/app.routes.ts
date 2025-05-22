import { Routes } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: NotesComponent, title: 'Notes' },
  { path: '**', component: NotFoundComponent, title: 'Page not found' },
];
