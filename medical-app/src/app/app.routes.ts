import { Routes } from '@angular/router';
import { AddUser } from './pages/add-user/add-user';
import { Acceuil } from './pages/acceuil/acceuil';
import { Patients } from './pages/patients/patients';
import { Rdv } from './pages/rdv/rdv';

export const routes: Routes = [
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
  { path: 'add-user', component: AddUser },
  { path: 'acceuil', component: Acceuil },
  { path: 'patients', component: Patients },
  { path: 'rdv', component: Rdv }
];