import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rdv',
  imports: [CommonModule],
  templateUrl: './rdv.html',
  styleUrl: './rdv.css',
})
export class Rdv {
  filtres: string[] = ['Tous', 'Confirmé', 'Reporté'];
  filtreActif: string = 'Tous';
  errorMessage: string = '';
  loading: boolean = false;
  rdvList: any[] = [
    {
      id: 1,
      patientNom: 'Patient A',
      patientId: 1,
      statut: 'Confirmé',
      date: '16-04-2026',
      heure: '10:00'
    },
    {
      id: 2,
      patientNom: 'Patient B',
      patientId: 2,
      statut: 'Reporté',
      date: '16-04-2026',
      heure: '14:00'
    }
  ];

  setFiltre(f: string) {
    this.filtreActif = f;
  }

  get filteredRdvList() {
    if (this.filtreActif === 'Tous') return this.rdvList;
    return this.rdvList.filter(r => r.statut === this.filtreActif);
  }

  setStatut(rdv: any, statut: string) {
    rdv.statut = statut;
  }

  supprimer(id: number) {
    this.rdvList = this.rdvList.filter(r => r.id !== id);
  }

  envoyer() {
    // Logic to send or save changes
    console.log('Envoyer les changements');
  }

  quitter() {
    // Logic to quit or navigate
    console.log('Quitter');
  }
}
