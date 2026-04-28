import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-dossier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modifier-dossier.html',
  styleUrl: './modifier-dossier.css',
})
export class ModifierDossier implements OnInit {

  dossier: any = {};
  id_dossier: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Récupérer l'id depuis les queryParams
    this.route.queryParams.subscribe(params => {
      this.id_dossier = +params['id'];
      // Charger les données actuelles du dossier
      this.http.get<any>(`http://localhost:8000/dossiers/${this.id_dossier}`)
        .subscribe({
          next: (data) => this.dossier = data,
          error: (err) => console.error('Erreur chargement dossier', err)
        });
    });
  }

  modifier() {
    this.http.put(`http://localhost:8000/dossiers/${this.id_dossier}`, this.dossier)
      .subscribe({
        next: () => {
          alert('Dossier modifié avec succès');
          this.router.navigate(['/medecin/consulter-dossier']);
        },
        error: (err) => {
          console.error('Erreur modification', err);
          alert('Erreur lors de la modification');
        }
      });
  }

  cancel() {
    this.router.navigate(['/medecin/consulter-dossier']);
  }
}