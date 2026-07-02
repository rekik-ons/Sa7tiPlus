import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Rdv {
  id_rdv: number;
  id_patient: number;
  id_medecin: number;
  specialite: string;
  date_RDV: string;
  heure_RDV: string;
  statut: 'Confirmé' | 'Reporté' | 'En Attente';
  date_creation?: string;
}

@Component({
  selector: 'app-consulter-rdv',
  imports: [CommonModule, RouterModule],
  templateUrl: './consulter-rdv.html',
  styleUrl: './consulter-rdv.css',
})
export class ConsulterRdv implements OnInit {
  filtreActif: string = 'all';
  rdvs: Rdv[] = [];
  nomPrenom: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (typeof localStorage === 'undefined') return;

    this.nomPrenom = `${localStorage.getItem('prenom')} ${localStorage.getItem('nom')}`;

    const idPatient = Number(localStorage.getItem('id_user'));
    if (!idPatient) return;

    this.http.get<Rdv[]>(`http://localhost:8000/rdv/patient/${idPatient}`).subscribe({
      next: (data: Rdv[]) => {
  this.rdvs = data.map(r => ({
    ...r,
    heure_RDV: new Date(Number(r.heure_RDV) * 1000).toISOString().substring(11, 16)
  }));
  console.log('statuts reçus:', JSON.stringify(this.rdvs.map(r => r.statut)));
},
      
      error: (err: any) => console.error('Erreur chargement RDV:', err)
    });
  }


filtrer(filtre: string): void {
  this.filtreActif = filtre;
}

get rdvsFiltres(): Rdv[] {
  if (this.filtreActif === 'all') return [...this.rdvs];
  return this.rdvs.filter(r => 
    r.statut.toLowerCase().trim() === this.filtreActif.toLowerCase().trim()
  );
}

  logout(): void {
    if (typeof localStorage !== 'undefined') localStorage.clear();
    this.router.navigate(['/connexion']);
  }

  annuler(id: number): void {
    this.http.delete(`http://localhost:8000/rdv/${id}`).subscribe({
      next: () => this.rdvs = this.rdvs.filter(r => r.id_rdv !== id),
      error: (err: any) => console.error('Erreur annulation:', err)
    });
  }
}