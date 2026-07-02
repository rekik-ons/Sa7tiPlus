import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmer-rdv',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirmer-rdv.html',
  styleUrls: ['./confirmer-rdv.css']
})
export class ConfirmerRdv implements OnInit {

  filtres: string[] = ['Tous', 'Confirmé', 'Reporté', 'EN attente'];
  filtreActif: string = 'Tous';

  errorMessage: string = '';
  loading: boolean = false;
  rdvList: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    let idMedecin: number | null = null;
    try {
      const storedId = localStorage.getItem('id_user');
      idMedecin = storedId ? Number(storedId) : null;
    } catch (e) {
      idMedecin = null;
    }

    if (!idMedecin) {
      this.errorMessage = 'Utilisateur non connecté';
      return;
    }

    this.loading = true;
    this.http.get<any[]>(`http://localhost:8000/rdv/medecin/${idMedecin}`)
      .subscribe({
        next: (data) => {
          this.rdvList = data.map((r: any) => ({
            ...r,
            statutPending: null,  
            envoye: false         
          }));
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement des rendez-vous';
          this.loading = false;
        }
      });
  }

  setFiltre(f: string): void {
    this.filtreActif = f;
  }

  get filteredRdvList() {
    if (this.filtreActif === 'Tous') return this.rdvList;
    return this.rdvList.filter(r => r.statut === this.filtreActif);
  }

 
  setStatut(rdv: any, statut: string): void {
    rdv.statutPending = statut;
  }

  infoMessage: string = '';

envoyer(): void {
  const rdvsModifies = this.rdvList.filter(r => r.statutPending && !r.envoye);
  if (rdvsModifies.length === 0) {
    this.infoMessage = 'Aucun RDV modifié à envoyer.';
    return;
  }
  rdvsModifies.forEach(rdv => {
    this.http.put(`http://localhost:8000/rdv/${rdv.id_rdv}/statut`, { statut: rdv.statutPending })
      .subscribe({
        next: () => {
          rdv.statut = rdv.statutPending;
          rdv.statutPending = null;
          rdv.envoye = true;
          this.infoMessage = 'Statuts mis à jour avec succès';
        },
        error: (err) => console.error(err)
      });
  });
}

  getStatutClass(statut: string): string {
    if (statut === 'Confirmé') return 'badge-confirme';
    if (statut === 'Reporté') return 'badge-reporte';
    return 'badge-attente';
  }

  supprimer(id: number): void {
    this.http.delete(`http://localhost:8000/rdv/${id}`)
      .subscribe({
        next: () => this.rdvList = this.rdvList.filter(r => r.id_rdv !== id),
        error: (err) => console.error(err)
      });
  }

  quitter(): void {
    this.router.navigate(['/medecin/consulter-dossier']);
  }
}