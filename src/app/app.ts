import { Component} from '@angular/core';
import { Connexion } from './connexion/connexion';
import {Admin} from './admin/admin';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; 
import {PrendreRdv} from './prendre-rdv/prendre-rdv';
import {ModifierRdv} from './modifier-rdv/modifier-rdv';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet], // TRÈS IMPORTANT
 template: `<router-outlet></router-outlet>`,
})
export class App {
 
 }