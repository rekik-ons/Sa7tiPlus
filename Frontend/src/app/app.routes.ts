import { Routes } from '@angular/router';
import { Acceuil } from './pages/acceuil/acceuil';
import { Connexion } from './pages/connexion/connexion';
import { Medecin } from './pages/medecin/medecin';
import { Patient } from './pages/patient/patient';
import { ConsulterUser } from './pages/admin/consulter-user/consulter-user';
import { AddUser } from './pages/admin/add-user/add-user';
import { ConsulterDossier } from './pages/medecin/consulter-dossier/consulter-dossier';
import { CreerDossier } from './pages/medecin/creer-dossier/creer-dossier';
import { ConsulterRdv } from './pages/patient/consulter-rdv/consulter-rdv';
import { ModifierDossier } from './pages/medecin/modifier-dossier/modifier-dossier';

export const routes: Routes = [
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
  { path: 'acceuil', component: Acceuil },
  { path: 'connexion', component: Connexion },
  { path: 'consulter-user', component: ConsulterUser },
  { path: 'add-user', component: AddUser },
  {
    path: 'medecin',
    component: Medecin,
    children: [
      { path: 'consulter-dossier', component: ConsulterDossier },
      { path: 'creer-dossier', component: CreerDossier },
      { path: 'modifier-dossier', component: ModifierDossier },
    ]
  },
  {
    path: 'patient',
    component: Patient,
    children: [
      { path: 'consulter-rdv', component: ConsulterRdv }
    ]
  }
];