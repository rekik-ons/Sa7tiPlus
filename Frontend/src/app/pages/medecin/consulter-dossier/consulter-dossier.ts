import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-consulter-dossier',
  templateUrl: './consulter-dossier.html',
  styleUrl: './consulter-dossier.css'
})
export class ConsulterDossier implements OnInit {

  recherche = '';
  filtreActif = 'all';
  tousLesDossiers: any[] = [];
  dossiersFiltres: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  nomPrenom: string = '';

ngOnInit() {
  this.nomPrenom = `${localStorage.getItem('prenom')} ${localStorage.getItem('nom')}`;
  this.loadDossiers();
}

  loadDossiers() {
    this.http.get<any[]>('http://localhost:8000/dossiers/').subscribe({
      next: (data) => {
        this.tousLesDossiers = data;
        this.filtreActif = 'all';
        this.appliquerFiltres();
      },
      error: () => console.error('Erreur chargement dossiers')
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/connexion']);
  }

  appliquerFiltres() {
    let liste = this.tousLesDossiers;

    if (this.filtreActif !== 'all') {
      liste = liste.filter(d => d.etat === this.filtreActif);
    }

    if (this.recherche.trim()) {
      const q = this.recherche.toLowerCase();
      liste = liste.filter(d =>
        d.nom?.toLowerCase().includes(q) ||
        d.prenom?.toLowerCase().includes(q)
      );
    }

    this.dossiersFiltres = liste;
  }

  filtrer(type: string) {
    this.filtreActif = type;
    this.appliquerFiltres();
  }

  successMessage: string = '';
errorMessage: string = '';

archiver(id: number) {
  if (!confirm('Confirmer l\'archivage de ce dossier ?')) return;
  this.http.put(`http://localhost:8000/dossiers/archive/${id}`, {}).subscribe({
    next: () => {
      this.successMessage = 'Dossier archivé avec succès';
      this.loadDossiers();
    },
    error: () => this.errorMessage = 'Erreur lors de l\'archivage'
  });
}
modifierDossier(id: number) {
  this.router.navigate(['/medecin/modifier-dossier'], { queryParams: { id } });
}
}