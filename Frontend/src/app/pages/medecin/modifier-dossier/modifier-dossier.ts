import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modifier-dossier',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './modifier-dossier.html',
  styleUrl: './modifier-dossier.css',
})
export class ModifierDossier implements OnInit {

  dossier: any = {};
  id_dossier: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id_dossier = +params['id'];
      if (this.id_dossier) {
        this.http.get<any>(`http://localhost:8000/dossiers/${this.id_dossier}`)
          .subscribe({
            next: (data) => this.dossier = data,
            error: (err) => {
              console.error('Erreur chargement dossier', err);
              this.errorMessage = 'Erreur lors du chargement du dossier';
            }
          });
      } else {
        this.errorMessage = 'ID dossier manquant';
      }
    });
  }

  modifier() {
    this.http.put(`http://localhost:8000/dossiers/${this.id_dossier}`, this.dossier).subscribe({
      next: () => {
        this.successMessage = 'Dossier modifié avec succès';
        setTimeout(() => this.router.navigate(['/medecin/consulter-dossier']), 1500);
      },
      error: () => this.errorMessage = 'Erreur lors de la modification'
    });
  }

  cancel() {
    this.router.navigate(['/medecin/consulter-dossier']);
  }
}