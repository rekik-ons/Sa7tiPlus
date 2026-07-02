import { Routes } from '@angular/router';
import { Acceuil } from './pages/acceuil/acceuil';
import { Connexion } from './pages/connexion/connexion';

import { Admin } from './pages/admin/admin';
import { ConsulterUser } from './pages/admin/consulter-user/consulter-user';
import { AddUser } from './pages/admin/add-user/add-user';
import {ModifierUser } from './pages/admin/modifier-user/modifier-user';

import { Medecin } from './pages/medecin/medecin';
import { ConsulterDossier } from './pages/medecin/consulter-dossier/consulter-dossier';
import { CreerDossier } from './pages/medecin/creer-dossier/creer-dossier';
import { ModifierDossier } from './pages/medecin/modifier-dossier/modifier-dossier';
import { ConfirmerRdv } from './pages/medecin/confirmer-rdv/confirmer-rdv';

import { Patient } from './pages/patient/patient';
import { ConsulterRdv } from './pages/patient/consulter-rdv/consulter-rdv';
import { PrendreRdv} from './pages/patient/prendre-rdv/prendre-rdv';
import { ModifierRdv} from './pages/patient/modifier-rdv/modifier-rdv';
 
export const routes: Routes = [
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
  { path: 'acceuil', component: Acceuil },
  { path: 'connexion', component: Connexion },
  
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: 'consulter-user', component: ConsulterUser },
      { path: 'add-user', component: AddUser },
      { path: 'modifier-user', component: ModifierUser }
    ]
  },
  {
    path: 'medecin',
    component: Medecin,
    children: [
      { path: 'consulter-dossier', component: ConsulterDossier },
      { path: 'creer-dossier', component: CreerDossier },
      { path: 'modifier-dossier', component: ModifierDossier },
      { path: 'confirmer-rdv', component: ConfirmerRdv },
      
    ]
  },
  {
    path: 'patient',
    component: Patient,
    children: [
      { path: 'consulter-rdv', component: ConsulterRdv },
      { path: 'prendre-rdv', component: PrendreRdv },
      { path: 'modifier-rdv',component :ModifierRdv}
    ]
  }
  
];