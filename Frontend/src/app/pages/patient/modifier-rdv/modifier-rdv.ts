import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modifier-rdv',
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-rdv.html',
  styleUrl: './modifier-rdv.css',
})
export class ModifierRdv implements OnInit {
  date_rdv: string = '';
  heure_rdv: string = '';
  specialite: string = '';
  id_rdv: number = 0;
  id_patient: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    
  if (typeof localStorage === 'undefined') return;
  this.id_patient = Number(localStorage.getItem('id_user'));
  this.id_rdv = Number(this.route.snapshot.queryParamMap.get('id'));
  this.date_rdv = this.route.snapshot.queryParamMap.get('date') || '';
  this.heure_rdv = this.route.snapshot.queryParamMap.get('heure') || '';
  this.specialite = this.route.snapshot.queryParamMap.get('specialite') || '';


    if (this.id_rdv) {
      this.http.get<any>(`http://localhost:8000/rdv/${this.id_rdv}`).subscribe({
        next: (data) => {
          this.date_rdv = data.date_RDV;
          this.heure_rdv = data.heure_RDV;
          this.specialite = data.specialite;
        },
        error: () => this.errorMessage = 'Erreur chargement RDV'
      });
    }
  }

  modifier(): void {
    if (!this.date_rdv || !this.heure_rdv) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
    const rdv = { id_patient: this.id_patient, date_RDV: this.date_rdv, heure_RDV: this.heure_rdv };
    this.http.put(`http://localhost:8000/rdv/${this.id_rdv}`, rdv).subscribe({
      next: () => {
        this.successMessage = 'RDV modifié avec succès !';
        setTimeout(() => this.router.navigate(['/patient/consulter-rdv']), 1500);
      },
      error: () => this.errorMessage = 'Erreur lors de la modification'
    });
  }

  annuler(): void {
    this.router.navigate(['/patient/consulter-rdv']);
  }
}