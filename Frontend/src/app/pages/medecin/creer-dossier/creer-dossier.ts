import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-dossier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creer-dossier.html',
  styleUrl: './creer-dossier.css',
})
export class CreerDossier {

  constructor(private Router: Router) {}

  dossier = {
    nom: '',
    prenom: '',
    age: null,
    allergie: '',
    poids: null,
    taille: null,
    diagnostic: '',
    traitement: '',
    etat: ''
  };

  creer() {
    console.log(this.dossier);
  }

  cancel() {
    this.Router.navigate(['/medecin/consulter-dossier']);
  }
}