import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creer-dossier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creer-dossier.html',
  styleUrls: ['./creer-dossier.css'],
})
export class CreerDossier {
  dossier = {
    id_patient: null,
    id_medecin: null,
    nom: '',
    prenom: '',
    allergie: '',
    poids: null,
    taille: null,
    etat_sante: '',
    diagnostic: '',
    traitement: '',
    description: '',
    etat: 'En cours de traitement'
  };

  constructor(private router: Router, private http: HttpClient) {}
  successMessage: string = '';
errorMessage: string = '';

creer() {
  if (!this.dossier.nom || !this.dossier.prenom) {
    this.errorMessage = 'Veuillez saisir le nom et prénom du patient.';
    return;
  }

  
  this.http.get<any[]>(`http://localhost:8000/users/all`).subscribe({
    next: (users) => {
      const patient = users.find(u =>
        u.nom.toLowerCase() === this.dossier.nom.toLowerCase() &&
        u.prenom.toLowerCase() === this.dossier.prenom.toLowerCase() &&
        u.profil === 'Patient'
      );

      if (!patient) {
        this.errorMessage = 'Aucun patient trouvé avec ce nom et prénom.';
        return;
      }

      if (patient.archiver) {
        this.errorMessage = `Impossible de créer un dossier : le patient ${patient.prenom} ${patient.nom} (ID: ${patient.id_user}) est archivé.`;
        return;
      }

      
      this.dossier.id_patient = patient.id_user;

      this.http.post('http://localhost:8000/dossiers/', this.dossier).subscribe({
        next: () => {
          this.successMessage = 'Dossier créé avec succès';
          setTimeout(() => this.router.navigate(['/medecin/consulter-dossier']), 1500);
        },
        error: (err) => {
          if (err.status === 0) this.errorMessage = 'Impossible de contacter le serveur.';
          else if (err.error?.detail) this.errorMessage = err.error.detail;
          else this.errorMessage = `Erreur ${err.status}: ${err.statusText}`;
        }
      });
    },
    error: () => {
      this.errorMessage = 'Erreur lors de la récupération des patients.';
    }
  });
}
  cancel() {
    this.router.navigate(['/medecin/consulter-dossier']);
  }
}