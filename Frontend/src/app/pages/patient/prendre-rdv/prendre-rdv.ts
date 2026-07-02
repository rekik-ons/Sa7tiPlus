import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prendre-rdv',
  imports: [CommonModule, FormsModule],
  templateUrl: './prendre-rdv.html',
  styleUrl: './prendre-rdv.css',
})
export class PrendreRdv implements OnInit {
  date_rdv: string = '';
  heure_rdv: string = '';
  specialite: string = '';
  id_patient: number = 0;
  id_medecin: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

 ngOnInit(): void {
  if (typeof localStorage === 'undefined') return; 
  this.id_patient = Number(localStorage.getItem('id_user'));
}

  onSpecialiteChange(specialite: string): void {
    this.id_medecin = null;
    this.errorMessage = '';
    if (!specialite) return;

    this.http.get<any[]>(`http://localhost:8000/medecin/specialite/${specialite}`)
      .subscribe({
        next: (data) => {
          if (data.length > 0) this.id_medecin = data[0].id_user;
          else this.errorMessage = 'Aucun médecin disponible pour cette spécialité';
        },
        error: () => this.errorMessage = 'Erreur lors du chargement des médecins'
      });
  }

  soumettre(): void {
    if (!this.date_rdv || !this.heure_rdv || !this.specialite) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
    if (!this.id_medecin) {
      this.errorMessage = 'Aucun médecin disponible pour cette spécialité';
      return;
    }
    const rdv = {
      id_patient: this.id_patient,
      id_medecin: this.id_medecin,
      specialite: this.specialite,
      date_RDV: this.date_rdv,
      heure_RDV: this.heure_rdv,
      statut: 'EN attente'
    };
    this.http.post('http://localhost:8000/rdv', rdv).subscribe({
      next: () => {
        this.successMessage = 'RDV créé avec succès !';
        setTimeout(() => this.router.navigate(['/patient/consulter-rdv']), 1500);
      },
      error: () => this.errorMessage = 'Erreur lors de la création du RDV'
    });
  }

  annuler(): void {
    this.router.navigate(['/patient/consulter-rdv']);
  }
}