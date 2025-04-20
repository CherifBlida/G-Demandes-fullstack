import { Routes } from '@angular/router';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { DemandeFormComponent } from './demande-form/demande-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/demandes', pathMatch: 'full' },
  { path: 'demandes', component: DemandeListComponent },
  { path: 'demandes/new', component: DemandeFormComponent },
  { path: 'demandes/edit/:id', component: DemandeFormComponent }
];
