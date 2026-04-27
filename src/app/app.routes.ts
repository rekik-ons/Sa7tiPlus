import { Routes } from '@angular/router';
import { Admin } from './admin/admin';
import { Connexion} from './connexion/connexion';
import {PrendreRdv} from './prendre-rdv/prendre-rdv'
import {ModifierRdv} from './modifier-rdv/modifier-rdv';
export const routes: Routes = [
{ path: '', redirectTo: '/connexion', pathMatch: 'full' }, // Affiche la connexion au lancement
  { path: 'connexion', component: Connexion },
  { path: 'admin', component: Admin },
  {path : 'prendre-rdv' ,component: PrendreRdv},
  {path :'modifier-rdv',component:ModifierRdv},
  { path: '', redirectTo: '/connexion', pathMatch: 'full' }
];
